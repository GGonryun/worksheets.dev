import { MarkdownMetadata } from './markdown-metadata';

export interface MarkdownDocument {
  metadata: MarkdownMetadata;
  content: string;
}
