import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { NullAstVisitor } from '@angular/compiler/src/expression_parser/ast';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface TreeNode {
  id?: number;
  selected?: boolean;
  code: string;
  description: string;
  typeOfRecord: string;
  applyOrONFeatureContextFlag: boolean;
  featureContextId?: number;
  featureContext?: number;
  featureContextCollection?: TreeNode[];
  featureContextInstance?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    id: 112,
    code: 'collection',
    description: '',
    typeOfRecord: 'collection',
    applyOrONFeatureContextFlag: false,
    featureContextId: null,
    featureContext: null,
    featureContextCollection: [],
    featureContextInstance: [],
  },
  {
    id: 8,
    code: 'CONSUMER',
    description: 'Consumer',
    typeOfRecord: 'collection',
    applyOrONFeatureContextFlag: false,
    featureContextId: null,
    featureContext: null,
    featureContextCollection: [
      {
        id: 9,
        code: 'client_aviato_afkl',
        description: 'BlueWeb',
        typeOfRecord: 'collection',
        applyOrONFeatureContextFlag: true,
        featureContextId: 8,
        featureContext: null,
        featureContextCollection: [
          {
            id: 10,
            code: 'Alto K10 ',
            description: 'K10 desc',
            typeOfRecord: 'collection',
            applyOrONFeatureContextFlag: true,
            featureContextId: 9,
            featureContext: null,
            featureContextCollection: [],
            featureContextInstance: [
              {
                id: 67,
                code: 'k11 fuel-petal',
                description: 'k11 petal desc',
                typeOfRecord: 'instance',
                applyOrONFeatureContextFlag: true,
                featureContextId: 10,
                featureContext: null,
                featureContextCollection: null,
                featureContextInstance: null,
              },
              {
                id: 11,
                code: 'k10 fuel-petrol',
                description: 'k10 petrol desc',
                typeOfRecord: 'instance',
                applyOrONFeatureContextFlag: true,
                featureContextId: 10,
                featureContext: null,
                featureContextCollection: null,
                featureContextInstance: null,
              },
            ],
          },
        ],
        featureContextInstance: [],
      },
    ],
    featureContextInstance: [],
  },
  {
    id: 113,
    code: 'testCollection',
    description: '',
    typeOfRecord: 'collection',
    applyOrONFeatureContextFlag: false,
    featureContextId: null,
    featureContext: null,
    featureContextCollection: [],
    featureContextInstance: [
      {
        id: 114,
        code: 'testInstance',
        description: '',
        typeOfRecord: 'instance',
        applyOrONFeatureContextFlag: false,
        featureContextId: 113,
        featureContext: null,
        featureContextCollection: null,
        featureContextInstance: null,
      },
      {
        id: 115,
        code: 'testInstance',
        description: '',
        typeOfRecord: 'instance',
        applyOrONFeatureContextFlag: false,
        featureContextId: 113,
        featureContext: null,
        featureContextCollection: null,
        featureContextInstance: null,
      },
    ],
  },
  {
    id: 116,
    code: 'testhierarchy',
    description: '',
    typeOfRecord: 'collection',
    applyOrONFeatureContextFlag: false,
    featureContextId: null,
    featureContext: null,
    featureContextCollection: [],
    featureContextInstance: [
      {
        id: 117,
        code: 'test',
        description: '',
        typeOfRecord: 'instance',
        applyOrONFeatureContextFlag: false,
        featureContextId: 116,
        featureContext: null,
        featureContextCollection: null,
        featureContextInstance: null,
      },
    ],
  },
  {
    id: 119,
    code: 'test',
    description: '',
    typeOfRecord: 'collection',
    applyOrONFeatureContextFlag: false,
    featureContextId: null,
    featureContext: null,
    featureContextCollection: [],
    featureContextInstance: [],
  },
  {
    id: 17,
    code: 'Mobile',
    description: 'Mobile Application1',
    typeOfRecord: 'collection',
    applyOrONFeatureContextFlag: true,
    featureContextId: null,
    featureContext: null,
    featureContextCollection: [
      {
        id: 18,
        code: 'Android',
        description: 'Apple Browser1',
        typeOfRecord: 'collection',
        applyOrONFeatureContextFlag: true,
        featureContextId: 17,
        featureContext: null,
        featureContextCollection: [
          {
            id: 91,
            code: 'test',
            description: '',
            typeOfRecord: 'collection',
            applyOrONFeatureContextFlag: false,
            featureContextId: 18,
            featureContext: null,
            featureContextCollection: [],
            featureContextInstance: [],
          },
        ],
        featureContextInstance: [
          {
            id: 19,
            code: 'Nokia1',
            description: 'Nokia Phone',
            typeOfRecord: 'instance',
            applyOrONFeatureContextFlag: true,
            featureContextId: 18,
            featureContext: null,
            featureContextCollection: null,
            featureContextInstance: null,
          },
        ],
      },
      {
        id: 20,
        code: 'iOS',
        description: 'Apple Phone',
        typeOfRecord: 'collection',
        applyOrONFeatureContextFlag: true,
        featureContextId: 17,
        featureContext: null,
        featureContextCollection: [],
        featureContextInstance: [
          {
            id: 21,
            code: 'Apple13',
            description: 'Apple Phone',
            typeOfRecord: 'instance',
            applyOrONFeatureContextFlag: true,
            featureContextId: 20,
            featureContext: null,
            featureContextCollection: null,
            featureContextInstance: null,
          },
          {
            id: 92,
            code: 'test',
            description: '',
            typeOfRecord: 'instance',
            applyOrONFeatureContextFlag: false,
            featureContextId: 20,
            featureContext: null,
            featureContextCollection: null,
            featureContextInstance: null,
          },
        ],
      },
    ],
    featureContextInstance: [],
  },
  {
    id: 83,
    code: 'CONSUMER - AVIATO',
    description: 'Consumer',
    typeOfRecord: 'collection',
    applyOrONFeatureContextFlag: true,
    featureContextId: null,
    featureContext: null,
    featureContextCollection: [
      {
        id: 90,
        code: 'test',
        description: '',
        typeOfRecord: 'collection',
        applyOrONFeatureContextFlag: true,
        featureContextId: 83,
        featureContext: null,
        featureContextCollection: [],
        featureContextInstance: [
          {
            id: 95,
            code: 'testnew',
            description: '',
            typeOfRecord: 'instance',
            applyOrONFeatureContextFlag: false,
            featureContextId: 90,
            featureContext: null,
            featureContextCollection: null,
            featureContextInstance: null,
          },
        ],
      },
      {
        id: 93,
        code: 'test3',
        description: '',
        typeOfRecord: 'collection',
        applyOrONFeatureContextFlag: false,
        featureContextId: 83,
        featureContext: null,
        featureContextCollection: [],
        featureContextInstance: [],
      },
      {
        id: 94,
        code: 'test2',
        description: '',
        typeOfRecord: 'collection',
        applyOrONFeatureContextFlag: false,
        featureContextId: 83,
        featureContext: null,
        featureContextCollection: [],
        featureContextInstance: [],
      },
      {
        id: 96,
        code: 'new',
        description: '',
        typeOfRecord: 'collection',
        applyOrONFeatureContextFlag: false,
        featureContextId: 83,
        featureContext: null,
        featureContextCollection: [],
        featureContextInstance: [],
      },
      {
        id: 97,
        code: 'new',
        description: '',
        typeOfRecord: 'collection',
        applyOrONFeatureContextFlag: false,
        featureContextId: 83,
        featureContext: null,
        featureContextCollection: [],
        featureContextInstance: [],
      },
    ],
    featureContextInstance: [
      {
        id: 84,
        code: 'client_NBA_afkl',
        description: 'NBA',
        typeOfRecord: 'instance',
        applyOrONFeatureContextFlag: true,
        featureContextId: 83,
        featureContext: null,
        featureContextCollection: null,
        featureContextInstance: null,
      },
    ],
  },
  {
    id: 89,
    code: 'Consumer_Mobile_CheckIn',
    description: 'Consumer Mobile Check In',
    typeOfRecord: 'collection',
    applyOrONFeatureContextFlag: true,
    featureContextId: null,
    featureContext: null,
    featureContextCollection: [
      {
        id: 98,
        code: 'test2.2.2',
        description: '',
        typeOfRecord: 'collection',
        applyOrONFeatureContextFlag: false,
        featureContextId: 89,
        featureContext: null,
        featureContextCollection: [],
        featureContextInstance: [],
      },
      {
        id: 99,
        code: 'test',
        description: '',
        typeOfRecord: 'collection',
        applyOrONFeatureContextFlag: false,
        featureContextId: 89,
        featureContext: null,
        featureContextCollection: [],
        featureContextInstance: [],
      },
    ],
    featureContextInstance: [],
  },
  {
    id: 100,
    code: 'Maruti',
    description: 'Maruti Car',
    typeOfRecord: 'collection',
    applyOrONFeatureContextFlag: true,
    featureContextId: null,
    featureContext: null,
    featureContextCollection: [
      {
        id: 101,
        code: 'Alto',
        description: 'Alto Small Variuant from Maruti',
        typeOfRecord: 'collection',
        applyOrONFeatureContextFlag: true,
        featureContextId: 100,
        featureContext: null,
        featureContextCollection: [
          {
            id: 102,
            code: 'Alto K10 ',
            description: 'K10 desc',
            typeOfRecord: 'collection',
            applyOrONFeatureContextFlag: true,
            featureContextId: 101,
            featureContext: null,
            featureContextCollection: [],
            featureContextInstance: [
              {
                id: 103,
                code: 'k10 fuel - petrol',
                description: 'k10 petrol desc',
                typeOfRecord: 'instance',
                applyOrONFeatureContextFlag: true,
                featureContextId: 102,
                featureContext: null,
                featureContextCollection: null,
                featureContextInstance: null,
              },
            ],
          },
        ],
        featureContextInstance: [],
      },
      {
        id: 104,
        code: 'Wagnor',
        description: 'Wagonr Small Variuant from Maruti',
        typeOfRecord: 'collection',
        applyOrONFeatureContextFlag: true,
        featureContextId: 100,
        featureContext: null,
        featureContextCollection: [
          {
            id: 105,
            code: 'Wagnor Petrol ',
            description: 'K10 desc',
            typeOfRecord: 'collection',
            applyOrONFeatureContextFlag: true,
            featureContextId: 104,
            featureContext: null,
            featureContextCollection: [],
            featureContextInstance: [
              {
                id: 106,
                code: 'Wagnor fuel - petrol',
                description: 'Wagnor petrol desc',
                typeOfRecord: 'instance',
                applyOrONFeatureContextFlag: true,
                featureContextId: 105,
                featureContext: null,
                featureContextCollection: null,
                featureContextInstance: null,
              },
            ],
          },
        ],
        featureContextInstance: [],
      },
    ],
    featureContextInstance: [],
  },
];

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'tree-nested-overview-example',
  templateUrl: 'tree-nested-overview-example.html',
  styleUrls: ['tree-nested-overview-example.css'],
})
export class TreeNestedOverviewExample implements OnInit {
  treeControl: NestedTreeControl<TreeNode>;
  dataSource: MatTreeNestedDataSource<TreeNode>;

  constructor() {
    this.treeControl = new NestedTreeControl<TreeNode>(this.getChildren);
    this.dataSource = new MatTreeNestedDataSource<TreeNode>();
  }

  ngOnInit() {
    this.dataSource.data = TREE_DATA;
    this.dataSource.data = this.parseHierarchyDetail(this.dataSource.data);
    Object.keys(this.dataSource.data).forEach((key) => {
      this.setParent(this.dataSource.data[key], null);
    });

    // this.getMappedValues();
    console.log(this.dataSource.data);
  }
  selectedIDs = [21, 92, 95, 103, 106];
  mappedIds;
  finalMapping = [];
  getMappedValues() {
    let selectedValue;
    this.dataSource.data.map((value) => {
      this.mappedIds = {
        parentCode: '',
        code: [],
        id: [],
      };
      this.mappedIds.parentCode = value.code;
      selectedValue = this.checkIDs(value);
      if (selectedValue.code.length > 0 && selectedValue.id.length > 0) {
        this.finalMapping.push(selectedValue);
      }
    });
    console.log(this.finalMapping);
  }

  checkIDs(obj) {
    if (obj.featureContextCollection.length > 0) {
      obj.featureContextCollection.forEach((value) => {
        this.checkIDs(value);
      });
    }
    if (obj.featureContextInstance.length > 0) {
      obj.featureContextInstance.forEach((value) => {
        if (this.selectedIDs.indexOf(value.id) !== -1) {
          value['selected'] = true;
          this.mappedIds.code.push(value.code);
          this.mappedIds.id.push(value.id);
          this.todoItemSelectionToggle(true, value);
        }
      });
    }
    return this.mappedIds;
  }

  getFinalizedValues() {
    let result = [];
    this.dataSource.data.forEach((node) => {
      let parent = node.code;
      console.log(node);
      result = result.concat(
        this.treeControl
          .getDescendants(node)
          .filter((x) => x.selected && x.id && x.code)
          .map((x) => {
            const finalValue = {
              parentCode: parent,
              id: x.id,
              code: x.code,
            };
            return finalValue;
          })
      );
    });

    console.log(result);
    let resultSet = [];
    result.map((iterate) => {
      const matchedIndex = resultSet.findIndex(
        (e) => e['parentCode'] === iterate['parentCode']
      );
      if (matchedIndex > -1) {
        resultSet[matchedIndex]['id'].push(iterate['id']);
        resultSet[matchedIndex]['code'].push(iterate['code']);
      } else {
        let newObject = {
          parentCode: iterate.parentCode,
          id: [iterate.id],
          code: [iterate.code],
        };
        resultSet.push(newObject);
      }
    });
    console.log(resultSet);
  }

  parseHierarchyDetail(featureHierarchy) {
    featureHierarchy.forEach((value) => {
      value = this.checkProperties(value);
    });
    featureHierarchy = [...featureHierarchy];
    return featureHierarchy;
  }

  checkProperties(obj) {
    if (
      obj.featureContextInstance === undefined ||
      obj.featureContextInstance === null
    ) {
      obj.featureContextInstance = [];
    } else {
      if (obj.featureContextInstance.length > 0) {
        obj.featureContextInstance.forEach((value) => {
          this.checkProperties(value);
        });
      }
    }

    if (
      obj.featureContextCollection === undefined ||
      obj.featureContextCollection === null
    ) {
      obj.featureContextCollection = [];
    } else {
      if (obj.featureContextCollection.length > 0) {
        obj.featureContextCollection.forEach((value) => {
          this.checkProperties(value);
        });
      }
    }
    return obj;
  }

  getChildren(node: TreeNode) {
    let returnValue;
    if (node.featureContextCollection.length > 0) {
      returnValue = node.featureContextCollection;
    } else if (node.featureContextInstance.length > 0) {
      returnValue = node.featureContextInstance;
    } else if (node.typeOfRecord === 'collection') {
      returnValue = node;
    } else {
      returnValue = '';
    }
    return returnValue;
  }

  hasChild(index: number, node: TreeNode) {
    let returnValue;
    if (node.featureContextCollection.length > 0) {
      returnValue = node.featureContextCollection;
    } else if (node.featureContextInstance.length > 0) {
      returnValue = node.featureContextInstance;
    } else if (node.typeOfRecord === 'collection') {
      returnValue = node;
    } else {
      returnValue = false;
    }
    return returnValue;
  }

  setParent(data, parent) {
    data.parent = parent;
    if (data.featureContextCollection) {
      data.featureContextCollection.forEach((x) => {
        this.setParent(x, data);
      });
    }
    if (data.featureContextInstance) {
      data.featureContextInstance.forEach((childNode) => {
        this.setParent(childNode, data);
      });
    }
  }

  checkAllParents(node) {
    if (node.parent) {
      const descendants = this.treeControl.getDescendants(node.parent);
      node.parent.selected = descendants.every((child) => child.selected);
      node.parent.indeterminate = descendants.some((child) => child.selected);
      this.checkAllParents(node.parent);
    }
  }
  todoItemSelectionToggle(checked, node) {
    node.selected = checked;
    if (node.featureContextCollection) {
      node.featureContextCollection.forEach((x) => {
        this.todoItemSelectionToggle(checked, x);
      });
    }
    if (node.featureContextInstance) {
      node.featureContextInstance.forEach((y) => {
        this.todoItemSelectionToggle(checked, y);
      });
    }
    this.checkAllParents(node);
  }

  // setChildOk(text: string, node: any) {
  //   node.forEach((x) => {
  //     x.ok = x.code.indexOf(text) >= 0;
  //     if (x.parent) this.setParentOk(text, x.parent, x.ok);
  //     if (x.children) this.setChildOk(text, x.children);
  //   });
  // }
  // setParentOk(text, node, ok) {
  //   node.ok = ok || node.ok || node.code.indexOf(text) >= 0;
  //   if (node.parent) this.setParentOk(text, node.parent, node.ok);
  // }

  submit() {
    let result = [];
    this.dataSource.data.forEach((node) => {
      let parent = node.code;
      console.log(node);
      result = result.concat(
        this.treeControl
          .getDescendants(node)
          .filter((x) => x.selected && x.id && x.code)
          .map((x) => {
            const finalValue = {
              parentCode: parent,
              parentId: node.id,
              id: x.id,
              code: x.code,
            };
            return finalValue;
          })
      );
    });

    console.log(result);
    let resultSet = [];
    result.map((iterate) => {
      const matchedIndex = resultSet.findIndex(
        (e) => e['parentCode'] === iterate['parentCode']
      );
      if (matchedIndex > -1) {
        resultSet[matchedIndex]['id'].push(iterate['id']);
        resultSet[matchedIndex]['code'].push(iterate['code']);
      } else {
        let newObject = {
          parentCode: iterate.parentCode,
          id: [iterate.id],
          code: [iterate.code],
          parentId: iterate.parentId,
        };
        resultSet.push(newObject);
      }
    });
    console.log(resultSet);

    let collectId = [];
    resultSet.forEach((ele) => {
      let idSet = [ele.parentId, ...ele['id']];
      collectId = [...collectId, ...idSet];
    });
    console.log(collectId);

    let result2 = this.dataSource.data
      .filter((x) => x.selected && x.id)
      .map((x) => x.code);
  }
  // //For check the values
  // getList2(node: any, result: any = null) {
  //   result = result || {};
  //   node.forEach((x) => {
  //     result[x.name] = {};
  //     result[x.name].ok = x.ok;
  //     if (x.children) result[x.name].children = this.getList2(x.children);
  //   });
  //   return result;
  // }
  // //Another way to check the values, we can not use {{datasource.node}}
  // getList(node: any) {
  //   return node.map((x) => {
  //     const r: any = {
  //       name: x.name + ' - ' + x.ok,
  //       children: x.children ? this.getList(x.children) : null,
  //     };
  //     if (!r.children) delete r.children;
  //     return r;
  //   });
  // }
}

/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
