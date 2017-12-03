import React from 'react';

export default class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }
    
    render() {
        const activeClass = this.props.active ? ' RichEditor-activeButton' : '';
        const className = `RichEditor-styleButton${activeClass}`;
 
        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}