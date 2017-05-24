declare module "hoist-non-react-statics" {

    // hoistNonReactStatic(targetComponent, sourceComponent);
    export default function fn<T, S>(targetComponent: T, sourceComponent: S): S;
}
