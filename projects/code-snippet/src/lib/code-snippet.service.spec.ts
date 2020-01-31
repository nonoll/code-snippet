import { TestBed } from '@angular/core/testing';

import { CodeSnippetService } from './code-snippet.service';

describe('CodeSnippetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodeSnippetService = TestBed.get(CodeSnippetService);
    expect(service).toBeTruthy();
  });
});
