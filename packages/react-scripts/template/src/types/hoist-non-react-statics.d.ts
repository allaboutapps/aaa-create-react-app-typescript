declare module "hoist-non-react-statics" {

    // hoistNonReactStatic(targetComponent, sourceComponent);
    function fn<T, S>(targetComponent: T, sourceComponent: S): S;

    export = fn;
}
