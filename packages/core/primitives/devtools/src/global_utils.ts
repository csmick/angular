/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {ControlFlowBlock} from '../../control_flow';
import {InjectionToken, Injector} from '../../di';
import {Type} from '../../interface';
import {DebugSignalGraph, SignalBaseGetter} from '../../signals';

// import {InjectedService, ProviderRecord} from '../../../src/render3/debug/injector_profiler';

import {DirectiveDebugMetadata} from './directive_debug_metadata';
import {Listener} from './listener';
import {type Profiler} from './profiler_types';

/**
 * A type of the internal (meaning inside google3) global utils. This definition needs to exist
 * in a place where it can be used by DevTools and also synced into google3 and consumed internally.
 *
 * Since versioning in google3 works differently, we do not have the same constraint as
 * {@link ExternalCoreGlobalUtils}. We can change these definitions more or less as much as we want
 * without fear of breaking applications on older framework versions (note that http://go/build-horizon
 * does technically apply). The trade-off is that external Angular developers cannot use such APIs,
 * as they would be broken whenever the APIs changed.
 *
 * `InternalCoreGlobalUtils` serves as a "beta" channel for new APIs which can be implemented and supported
 * in DevTools. We can then iterate and change these APIs, landing whatever breaking changes necessary,
 * and update DevTools accordingly without actually breaking any users. Once a given function's design
 * fully validated, we can move it to {@link ExternalCoreGlobalUtils} and ship the function externally in
 * Angular. This allows fast iteration on new global utils and only applies Angular's long-lived
 * versioning constraint when we are ready to accept it.
 */
export interface InternalCoreGlobalUtils {}

/**
 * The set of external (meaning outside google3) global utils implemented by `@angular/core`.
 * Other packages may provided their own global utilities with their own types. Any functions
 * which have *ever* been in this set exist in long-lived public Angular versions which DevTools
 * needs to support.
 */
export interface ExternalCoreGlobalUtils {
  // ɵgetDependenciesFromInjectable<T>(
  //   injector: Injector,
  //   token: Type<T> | InjectionToken<T>,
  // ): {instance: T; dependencies: Omit<InjectedService, 'injectedIn'>[]} | undefined;
  // ɵgetInjectorProviders(injector: Injector): ProviderRecord[];
  ɵgetInjectorResolutionPath(injector: Injector): Injector[];
  ɵgetInjectorMetadata(
    injector: Injector,
  ):
    | {type: 'element'; source: Element}
    | {type: 'environment'; source: string | null}
    | {type: 'null'; source: null}
    | null;
  ɵsetProfiler(profiler: Profiler | null): () => void;
  ɵgetSignalGraph(injector: Injector): DebugSignalGraph;
  ɵgetControlFlowBlocks(node: Node): ControlFlowBlock[];
  ɵgetTransferState(injector: Injector): Record<string, unknown>;

  getDirectiveMetadata(directiveOrComponentInstance: any): DirectiveDebugMetadata | null;
  getComponent<T>(element: Element): T | null;
  getContext<T extends {}>(element: Element): T | null;
  getListeners(element: Element): Listener[];
  getOwningComponent<T>(elementOrDir: Element | {}): T | null;
  getHostElement(componentOrDirective: {}): Element;
  getInjector(elementOrDir: Element | {}): Injector;
  getRootComponents(elementOrDir: Element | {}): {}[];
  getDirectives(node: Node): {}[];
  applyChanges(component: {}): void;
  isSignal(value: unknown): value is SignalBaseGetter<unknown>;
  enableProfiling(): void;
}
