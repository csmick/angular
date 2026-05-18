/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {ControlFlowBlock} from '../../../primitives/control_flow';
import {TrackByFunction} from '../../change_detection';
import {LView, TView} from '../interfaces/view';
import {LiveCollection} from '../list_reconciliation';

/**
 * A configuration object passed to a `ControlFlowBlockViewFinder` function.
 */
export interface ControlFlowBlockViewFinderConfig {
  node: Node;
  lView: LView;
  tView: TView;
  slotIdx: number;
}

/**
 * Describes a finder function that extracts `ControlFlowBlock`s from an LView.
 */
export type ControlFlowBlockViewFinder = (
  config: ControlFlowBlockViewFinderConfig,
) => ControlFlowBlock | null;

/**
 * Represents `RepeaterMetadata` data mirror.
 * Required due to a circular dependency.
 */
export interface RepeaterMetadataShape {
  hasEmptyBlock: boolean;
  trackByFn: TrackByFunction<unknown>;
  liveCollection?: LiveCollection<unknown, unknown>;
}
