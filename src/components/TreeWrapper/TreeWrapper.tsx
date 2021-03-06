import * as React from 'react';
import { Tree } from 'antd';

import { parseTree, Node } from '../../helpers';

const TreeNode = Tree.TreeNode;

interface Props {
    rawTree: string;
    renderTree: boolean;
}

interface State {
    tree: Node;
}

class TreeWrapper extends React.Component<Props, State> {
    state = {
        tree: {
            isRoot: false,
            title: null,
            children: [],
            error: ''
        }
    };

    static getDerivedStateFromProps({renderTree, rawTree}: Props) {
        if (renderTree) {
            return {
                tree: parseTree(rawTree)
            };
        }

        return null;
    }

    renderChildren = ({children, title}: Node): React.ReactNode => (
        <TreeNode title={title} key={title || 'root'}>
            {
                children.length ? children.map(this.renderChildren) : null
            }
        </TreeNode>
    )

    render() {
        const {children, error} = this.state.tree;

        return (
            <div>
                {error ? <div className="error" dangerouslySetInnerHTML={{__html: error}}/> : !!children.length && (
                    <Tree
                        showLine={true}
                        defaultExpandAll={true}
                    >
                        {
                            children.map(this.renderChildren)
                        }
                    </Tree>
                )}
            </div>
        );
    }
}

export default TreeWrapper;
