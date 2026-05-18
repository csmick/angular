/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {ChangeDetectionStrategy} from '../../change_detection';
import {ViewEncapsulation} from '../../metadata';
import {Framework} from './framework';

/** Metadata common to directives from all frameworks.  */
export interface BaseDirectiveDebugMetadata {
  name?: string;
  framework?: Framework;
}

/**
 * Partial metadata for a given Angular directive instance.
 *
 * @publicApi
 */
export interface AngularDirectiveDebugMetadata extends BaseDirectiveDebugMetadata {
  framework?: Framework.Angular; // Optional for backwards compatibility.
  inputs: Record<string, string>;
  outputs: Record<string, string>;
}

/**
 * Partial metadata for a given Angular component instance.
 *
 * @publicApi
 */
export interface AngularComponentDebugMetadata extends AngularDirectiveDebugMetadata {
  encapsulation: ViewEncapsulation;
  changeDetection: ChangeDetectionStrategy;
}

/** Partial metadata for a given ACX directive instance. */
export interface AcxDirectiveDebugMetadata extends BaseDirectiveDebugMetadata {
  framework: Framework.ACX;
  inputs: Record<string, string>;
  outputs: Record<string, string>;
}

/** ACX change detection strategies. */
export enum AcxChangeDetectionStrategy {
  Default = 0,
  OnPush = 1,
}

/** ACX view encapsulation modes. */
export enum AcxViewEncapsulation {
  Emulated = 0,
  None = 1,
}

/** Partial metadata for a given ACX component instance. */
export interface AcxComponentDebugMetadata extends AcxDirectiveDebugMetadata {
  changeDetection: AcxChangeDetectionStrategy;
  encapsulation: AcxViewEncapsulation;
}

/** Partial metadata for a given Wiz component instance. */
export interface WizComponentDebugMetadata extends BaseDirectiveDebugMetadata {
  framework: Framework.Wiz;
  props: Record<string, string>;
}

/** All potential debug metadata types across all frameworks. */
export type DirectiveDebugMetadata =
  | AngularDirectiveDebugMetadata
  | AcxDirectiveDebugMetadata
  | AngularComponentDebugMetadata
  | AcxComponentDebugMetadata
  | WizComponentDebugMetadata;
