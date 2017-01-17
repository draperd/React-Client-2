import React from "react";

class ListView extends React.Component {

   render() {
      return (<ul> {this.props.list.entries.map((entry) => 
         <li onClick={() => this.props.navigationHandler(entry)} key={entry.entry.id}>{entry.entry.name}</li>
      )}</ul>);
   }
}

export default ListView;