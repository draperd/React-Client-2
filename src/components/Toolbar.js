import React from "react";

class Toolbar extends React.Component {

   render() {
      return (<span>
         <button onClick={this.props.pageBackHandler}>Page Back</button>
         <span>{this.props.list.pagination.skipCount / this.props.list.pagination.maxItems + 1}</span>
         <button onClick={this.props.pageForwardHandler}>Page Forward</button>
      </span>)
   }
}

export default Toolbar;