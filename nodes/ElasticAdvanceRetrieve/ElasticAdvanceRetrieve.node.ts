import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import axios from 'axios';

export class ElasticAdvanceRetrieve implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Elasticsearch Advance Retrieve',
		name: 'elasticAdvanceRetrieve',
		icon: 'file:elasticsearch.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Advanced document retrieval from Elasticsearch',
		defaults: {
			name: 'Elasticsearch Advance Retrieve',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'elasticAdvanceRetrieveApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Index',
				name: 'index',
				type: 'string',
				default: '',
				required: true,
				description: 'The index to search in',
			},
			{
				displayName: 'Query (JSON)',
				name: 'query',
				type: 'json',
				default: '{\n  "query": {\n    "match_all": {}\n  }\n}',
				required: true,
				description: 'The query to run in JSON format',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];
		
		const credentials = await this.getCredentials('elasticAdvanceRetrieveApi');
		const host = credentials.host as string;
		const index = this.getNodeParameter('index', 0) as string;
		const queryJson = this.getNodeParameter('query', 0) as string;

		let query;
		try {
			query = JSON.parse(queryJson);
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Query must be a valid JSON', { description: 'The provided query is not a valid JSON object' });
		}

		let headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};

		// Authentication
		if (credentials.apiKey) {
			headers.Authorization = `ApiKey ${credentials.apiKey}`;
		} else if (credentials.username && credentials.password) {
			// Using Buffer instead of btoa for Node.js compatibility
			const auth = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');
			headers.Authorization = `Basic ${auth}`;
		}

		try {
			const endpoint = `${host}/${index}/_search`;
			const response = await axios.post(endpoint, query, { headers });

			const hits = response.data.hits.hits;
			for (const hit of hits) {
				const json = {
					_id: hit._id,
					_score: hit._score,
					...hit._source,
				};
				returnData.push({ json });
			}
		} catch (error) {
			if (error.response) {
				throw new NodeOperationError(this.getNode(), `Elasticsearch error: ${error.response.data.error.reason || error.message}`);
			}
			throw new NodeOperationError(this.getNode(), `Error occurred: ${error.message}`);
		}

		return [returnData];
	}
}