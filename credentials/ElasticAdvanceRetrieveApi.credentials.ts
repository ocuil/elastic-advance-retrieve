import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ElasticAdvanceRetrieveApi implements ICredentialType {
	name = 'elasticAdvanceRetrieveApi';
	displayName = 'Elasticsearch API';
	documentationUrl = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html';
	properties: INodeProperties[] = [
		{
			displayName: 'Host',
			name: 'host',
			type: 'string',
			default: 'http://localhost:9200',
			placeholder: 'http://localhost:9200',
			description: 'URL of the Elasticsearch instance',
			required: true,
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'options',
			options: [
				{
					name: 'Basic Auth',
					value: 'basicAuth',
				},
				{
					name: 'API Key',
					value: 'apiKey',
				},
				{
					name: 'None',
					value: 'none',
				},
			],
			default: 'basicAuth',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			description: 'Username for Elasticsearch instance',
			displayOptions: {
				show: {
					authentication: ['basicAuth'],
				},
			},
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Password for Elasticsearch instance',
			displayOptions: {
				show: {
					authentication: ['basicAuth'],
				},
			},
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'API Key for Elasticsearch instance',
			displayOptions: {
				show: {
					authentication: ['apiKey'],
				},
			},
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{$credentials.authentication === "basicAuth" ? "Basic " + Buffer.from($credentials.username + ":" + $credentials.password).toString("base64") : $credentials.authentication === "apiKey" ? "ApiKey " + $credentials.apiKey : undefined}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.host}}',
			url: '/',
			method: 'GET',
		},
	};
}