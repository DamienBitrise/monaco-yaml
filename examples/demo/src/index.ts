import './index.css';

import { JSONSchemaForSchemaStoreOrgCatalogFiles } from '@schemastore/schema-catalog';
import { ILanguageFeaturesService } from 'monaco-editor/esm/vs/editor/common/services/languageFeatures.js';
import { OutlineModel } from 'monaco-editor/esm/vs/editor/contrib/documentSymbols/browser/outlineModel.js';
import {
  editor,
  Environment,
  languages,
  MarkerSeverity,
  Position,
  Range,
  Uri,
} from 'monaco-editor/esm/vs/editor/editor.api.js';
import { StandaloneServices } from 'monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js';
import { SchemasSettings, setDiagnosticsOptions } from 'monaco-yaml';

// NOTE: This will give you all editor featues. If you would prefer to limit to only the editor
// features you want to use, import them each individually. See this example: (https://github.com/microsoft/monaco-editor-samples/blob/main/browser-esm-webpack-small/index.js#L1-L91)
import 'monaco-editor';

import defaultSchemaUri from './schema.json';

declare global {
  interface Window {
    MonacoEnvironment: Environment;
  }
}

window.MonacoEnvironment = {
  getWorker(moduleId, label) {
    switch (label) {
      case 'editorWorkerService':
        return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker', import.meta.url));
      case 'yaml':
        return new Worker(new URL('monaco-yaml/yaml.worker', import.meta.url));
      default:
        throw new Error(`Unknown label ${label}`);
    }
  },
};

const defaultSchema: SchemasSettings = {
  uri: defaultSchemaUri,
  fileMatch: ['monaco-yaml.yaml'],
};

const modelUri = Uri.parse('a://b/foo.yaml');

setDiagnosticsOptions({
  enableSchemaRequest: true,
  hover: true,
  completion: true,
  validate: true,
  format: true,
  schemas: [
    {
      uri: "http://placeholder/BitriseDataModel.json",
      fileMatch: [String(modelUri)],
      schema: {
        "required": ["format_version"],
        "properties": {
          "format_version": {
            "type": "string"
          },
          "default_step_lib_source": {
            "type": "string"
          },
          "project_type": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "summary": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "app": {
            "$ref": "http://placeholder/AppModel.json"
          },
          "meta": {
            "patternProperties": {
              ".*": {
                "additionalProperties": true
              }
            },
            "type": "object"
          },
          "trigger_map": {
            "items": {
              "$ref": "http://placeholder/TriggerMapItemModel.json"
            },
            "type": "array"
          },
          "pipelines": {
            "patternProperties": {
              ".*": {
                "$ref": "http://placeholder/PipelineModel.json"
              }
            },
            "type": "object"
          },
          "stages": {
            "patternProperties": {
              ".*": {
                "$ref": "http://placeholder/StageModel.json"
              }
            },
            "type": "object"
          },
          "workflows": {
            "patternProperties": {
              ".*": {
                "$ref": "http://placeholder/WorkflowModel.json"
              }
            },
            "type": "object"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    },
    {
      uri: "http://placeholder/AppModel.json",
      schema: {
        "properties": {
          "title": {
            "type": "string"
          },
          "summary": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "envs": {
            "items": {
              "patternProperties": {
                ".*": {
                  "additionalProperties": true
                }
              },
              "type": "object"
            },
            "type": "array"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    },
    {
      uri: "http://placeholder/AptGetDepModel.json",
      schema: {
        "properties": {
          "name": {
            "type": "string"
          },
          "bin_name": {
            "type": "string"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    },
    {
      uri: "http://placeholder/BashStepToolkitModel.json",
      schema: {
        "properties": {
          "entry_file": {
            "type": "string"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    },
    {
      uri: "http://placeholder/BrewDepModel.json",
      schema: {
        "properties": {
          "name": {
            "type": "string"
          },
          "bin_name": {
            "type": "string"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    },
    {
      uri: "http://placeholder/CheckOnlyDepModel.json",
      schema: {
        "properties": {
          "name": {
            "type": "string"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    },
    {
      uri: "http://placeholder/DepsModel.json",
      schema: {
        "properties": {
          "brew": {
            "items": {
              "$ref": "http://placeholder/BrewDepModel.json"
            },
            "type": "array"
          },
          "apt_get": {
            "items": {
              "$ref": "http://placeholder/AptGetDepModel.json"
            },
            "type": "array"
          },
          "check_only": {
            "items": {
              "$ref": "http://placeholder/CheckOnlyDepModel.json"
            },
            "type": "array"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    },
    {
      uri: "http://placeholder/GoStepToolkitModel.json",
      schema: {
        "required": ["package_name"],
        "properties": {
          "package_name": {
            "type": "string"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    },
    {
      uri: "http://placeholder/PipelineModel.json",
      schema: {
        "properties": {
          "stages": {
            "items": {
              "patternProperties": {
                ".*": {
                  "$ref": "http://placeholder/StageModel.json"
                }
              },
              "type": "object"
            },
            "type": "array"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    },
    {
      uri: "http://placeholder/StageModel.json",
      schema: {
        "properties": {
          "workflows": {
            "items": {
              "patternProperties": {
                ".*": {
                  "$ref": "http://placeholder/WorkflowModel.json"
                }
              },
              "type": "object"
            },
            "type": "array"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    },
    {
      uri: "http://placeholder/StepModel.json",
      schema: {
        "properties": {
          "title": {
            "type": "string"
          },
          "summary": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "website": {
            "type": "string"
          },
          "source_code_url": {
            "type": "string"
          },
          "support_url": {
            "type": "string"
          },
          "published_at": {
            "type": "string",
            "format": "date-time"
          },
          "source": {
            "$ref": "http://placeholder/StepSourceModel.json"
          },
          "asset_urls": {
            "patternProperties": {
              ".*": {
                "type": "string"
              }
            },
            "type": "object"
          },
          "host_os_tags": {
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "project_type_tags": {
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "type_tags": {
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "toolkit": {
            "$ref": "http://placeholder/StepToolkitModel.json"
          },
          "deps": {
            "$ref": "http://placeholder/DepsModel.json"
          },
          "is_requires_admin_user": {
            "type": "boolean"
          },
          "is_always_run": {
            "type": "boolean"
          },
          "is_skippable": {
            "type": "boolean"
          },
          "run_if": {
            "type": "string"
          },
          "timeout": {
            "type": "integer"
          },
          "meta": {
            "patternProperties": {
              ".*": {
                "additionalProperties": true
              }
            },
            "type": "object"
          },
          "inputs": {
            "items": {
              "$ref": "http://placeholder/GitCloneModel.json"
            },
            "type": "array"
          },
          "outputs": {
            "items": {
              "patternProperties": {
                ".*": {
                  "additionalProperties": true
                }
              },
              "type": "object"
            },
            "type": "array"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    },
    {
      uri: "http://placeholder/GitCloneModel.json",
      schema: {
        "properties": {       
          repository_url: {
            "type": "string"
          },
          clone_into_dir: {
            "type": "string"
          },
          commit: {
            "type": "string"
          },
          tag: {
            "type": "string"
          },
          branch: {
            "type": "string"
          },
          branch_dest: {
            "type": "string"
          },
          pull_request_id: {
            "type": "string"
          },
          pull_request_repository_url: {
            "type": "string"
          },
          pull_request_merge_branch: {
            "type": "string"
          },
          pull_request_head_branch: {
            "type": "string"
          },
          update_submodules: {
            "type": "string"
          },
          clone_depth: {
            "type": "string"
          },
          submodule_update_depth: {
            "type": "string"
          },
          merge_pr: {
            "type": "string"
          },
          sparse_directories: {
            "type": "string"
          },
          reset_repository: {
            "type": "string"
          },
          manual_merge: {
            "type": "string"
          },
          fetch_tags: {
            "type": "string"
          },
          build_url: {
            "type": "string"
          },
          build_api_token: {
            "type": "string"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    },
    {
      uri: "http://placeholder/StepSourceModel.json",
      schema: {
        "properties": {
          "git": {
            "type": "string"
          },
          "commit": {
            "type": "string"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    },
    {
      uri: "http://placeholder/StepToolkitModel.json",
      schema: {
        "properties": {
          "bash": {
            "$ref": "http://placeholder/BashStepToolkitModel.json"
          },
          "go": {
            "$ref": "http://placeholder/GoStepToolkitModel.json"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    },
    {
      uri: "http://placeholder/TriggerMapItemModel.json",
      schema: {
        "properties": {
          "push_branch": {
            "type": "string"
          },
          "pull_request_source_branch": {
            "type": "string"
          },
          "pull_request_target_branch": {
            "type": "string"
          },
          "tag": {
            "type": "string"
          },
          "pipeline": {
            "type": "string"
          },
          "workflow": {
            "type": "string"
          },
          "pattern": {
            "type": "string"
          },
          "is_pull_request_allowed": {
            "type": "boolean"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    },
    {
      uri: "http://placeholder/WorkflowModel.json",
      schema: {
        "properties": {
          "title": {
            "type": "string"
          },
          "summary": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "before_run": {
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "after_run": {
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "envs": {
            "items": {
              "patternProperties": {
                ".*": {
                  "additionalProperties": true
                }
              },
              "type": "object"
            },
            "type": "array"
          },
          "steps": {
            "items": {
              "patternProperties": {
                ".*": {
                  "$ref": "http://placeholder/StepModel.json"
                }
              },
              "type": "object"
            },
            "type": "array"
          },
          "meta": {
            "patternProperties": {
              ".*": {
                "additionalProperties": true
              }
            },
            "type": "object"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    }
  ],
});

const value = `---
format_version: '11'
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
project_type: ios
trigger_map:
- pull_request_source_branch: "*"
  workflow: primary
workflows:
  primary:
    steps:
    - activate-ssh-key@4:
        run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
    - git-clone@4: {}
    - cache-pull@2: {}
    - script@1:
        inputs:
        - content: for ip in $(dig @8.8.8.8 github.com +short); do ssh-keyscan github.com,$ip;
            ssh-keyscan $ip; done 2>/dev/null >> ~/.ssh/known_hosts
        title: Saving to known_hosts
app:
  envs:
  - opts:
      is_expand: false
    BITRISE_PROJECT_PATH: STORESPaymentsSDK.xcodeproj
  - opts:
      is_expand: false
    BITRISE_SCHEME: STORESPaymentsSDK
  - opts:
      is_expand: false
    BITRISE_EXPORT_METHOD: development
  - opts:
      is_expand: false
    BITRISE_SCHEME_INTERNAL_SDK: STPInternalSDK
meta:
  bitrise.io:
    stack: osx-xcode-13.3.x
`.replace(/:$/m, ': ');

const ed = editor.create(document.getElementById('editor'), {
  automaticLayout: true,
  model: editor.createModel(value, 'yaml', modelUri),
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'vs-dark' : 'vs-light',
});

const select = document.getElementById('schema-selection') as HTMLSelectElement;
/*
fetch('https://www.schemastore.org/api/json/catalog.json').then(async (response) => {
  if (!response.ok) {
    return;
  }
  const catalog = (await response.json()) as JSONSchemaForSchemaStoreOrgCatalogFiles;
  const schemas = [defaultSchema];
  catalog.schemas.sort((a, b) => a.name.localeCompare(b.name));
  for (const { fileMatch, name, url } of catalog.schemas) {
    const match =
      typeof name === 'string' && fileMatch?.find((filename) => /\.ya?ml$/i.test(filename));
    if (!match) {
      continue;
    }
    const option = document.createElement('option');
    option.value = match;

    option.textContent = name;
    select.append(option);
    schemas.push({
      fileMatch: [match],
      uri: url,
    });
  }

  setDiagnosticsOptions({
    validate: true,
    enableSchemaRequest: true,
    format: true,
    hover: true,
    completion: true,
    schemas,
  });
});
*/

select.addEventListener('change', () => {
  const oldModel = ed.getModel();
  const newModel = editor.createModel(oldModel.getValue(), 'yaml', modelUri);
  ed.setModel(newModel);
  oldModel.dispose();
});

function* iterateSymbols(
  symbols: languages.DocumentSymbol[],
  position: Position,
): Iterable<languages.DocumentSymbol> {
  for (const symbol of symbols) {
    if (Range.containsPosition(symbol.range, position)) {
      yield symbol;
      if (symbol.children) {
        yield* iterateSymbols(symbol.children, position);
      }
    }
  }
}

ed.onDidChangeCursorPosition(async (event) => {
  const breadcrumbs = document.getElementById('breadcrumbs');
  const { documentSymbolProvider } = StandaloneServices.get(ILanguageFeaturesService);
  const outline = await OutlineModel.create(documentSymbolProvider, ed.getModel());
  const symbols = outline.asListOfDocumentSymbols();
  while (breadcrumbs.lastChild) {
    breadcrumbs.lastChild.remove();
  }
  for (const symbol of iterateSymbols(symbols, event.position)) {
    const breadcrumb = document.createElement('span');
    breadcrumb.setAttribute('role', 'button');
    breadcrumb.classList.add('breadcrumb');
    breadcrumb.textContent = symbol.name;
    breadcrumb.title = symbol.detail;
    if (symbol.kind === languages.SymbolKind.Array) {
      breadcrumb.classList.add('array');
    } else if (symbol.kind === languages.SymbolKind.Module) {
      breadcrumb.classList.add('object');
    }
    breadcrumb.addEventListener('click', () => {
      ed.setPosition({
        lineNumber: symbol.range.startLineNumber,
        column: symbol.range.startColumn,
      });
      ed.focus();
    });
    breadcrumbs.append(breadcrumb);
  }
});

editor.onDidChangeMarkers(([resource]) => {
  const problems = document.getElementById('problems');
  const markers = editor.getModelMarkers({ resource });
  while (problems.lastChild) {
    problems.lastChild.remove();
  }
  for (const marker of markers) {
    if (marker.severity === MarkerSeverity.Hint) {
      continue;
    }
    const wrapper = document.createElement('div');
    wrapper.setAttribute('role', 'button');
    const codicon = document.createElement('div');
    const text = document.createElement('div');
    wrapper.classList.add('problem');
    codicon.classList.add(
      'codicon',
      marker.severity === MarkerSeverity.Warning ? 'codicon-warning' : 'codicon-error',
    );
    text.classList.add('problem-text');
    text.textContent = marker.message;
    wrapper.append(codicon, text);
    wrapper.addEventListener('click', () => {
      ed.setPosition({ lineNumber: marker.startLineNumber, column: marker.startColumn });
      ed.focus();
    });
    problems.append(wrapper);
  }
});
