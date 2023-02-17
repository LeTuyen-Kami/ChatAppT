import ApiGenerator from 'services/ApiGenerator';

const API_KEY = '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';

const BASE_URL = 'https://api.openai.com/v1';

const openai = new ApiGenerator(BASE_URL, API_KEY);

const listModel = [
  'babbage',
  'code-davinci-002',
  'davinci',
  'text-embedding-ada-002',
  'babbage-code-search-code',
  'text-similarity-babbage-001',
  'text-davinci-001',
  'ada',
  'curie-instruct-beta',
  'babbage-code-search-text',
  'babbage-similarity',
  'curie-search-query',
  'code-search-babbage-text-001',
  'text-davinci-002',
  'code-cushman-001',
  'code-search-babbage-code-001',
  'audio-transcribe-deprecated',
  'text-ada-001',
  'text-similarity-ada-001',
  'text-davinci-insert-002',
  'ada-code-search-code',
  'ada-similarity',
  'code-search-ada-text-001',
  'text-search-ada-query-001',
  'text-curie-001',
  'text-davinci-edit-001',
  'davinci-search-document',
  'ada-code-search-text',
  'text-search-ada-doc-001',
  'code-davinci-edit-001',
  'davinci-instruct-beta',
  'text-similarity-curie-001',
  'code-search-ada-code-001',
  'ada-search-query',
  'text-search-davinci-query-001',
  'davinci-search-query',
  'text-davinci-insert-001',
  'babbage-search-document',
  'ada-search-document',
  'text-search-babbage-doc-001',
  'text-search-curie-doc-001',
  'text-search-curie-query-001',
  'babbage-search-query',
  'text-babbage-001',
  'text-search-davinci-doc-001',
  'text-davinci-003',
  'text-search-babbage-query-001',
  'curie-similarity',
  'curie-search-document',
  'curie',
  'text-similarity-davinci-001',
  'davinci-similarity',
  'cushman:2020-05-03',
  'ada:2020-05-03',
  'babbage:2020-05-03',
  'curie:2020-05-03',
  'davinci:2020-05-03',
  'if-davinci-v2',
  'if-curie-v2',
  'if-davinci:3.0.0',
  'davinci-if:3.0.0',
  'davinci-instruct-beta:2.0.0',
  'text-ada:001',
  'text-davinci:001',
  'text-curie:001',
  'text-babbage:001',
];

interface ICompletionParams {
  model: 'text-davinci-003';
  prompt: string;
  max_tokens: number;
  temperature: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stream?: boolean;
}

export const createCompletion = (params: ICompletionParams) => {
  return openai.postApi('completions', true, params);
};
