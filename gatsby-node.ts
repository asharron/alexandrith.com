import type {GatsbyNode} from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({actions}) => {
    actions.setWebpackConfig({
        module: {
            rules: [{
                test: /\.glb$/,
                type: "asset/resource",
            }],
        },
    });
};