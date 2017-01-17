import React from "react";
import Breadcrumb from "./Breadcrumb";
import Toolbar from "./Toolbar";
import ListView from "./ListView";
import NodeService from "alfresco-js-utils/lib/services/NodeService";
 
class List extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         skipCount: 0,
         maxItems: 3,
         relativePath: "/",
         list: {
            entries: [],
            pagination: {
               skipCount: 0,
               maxItems: 3
            }
         }
      };

      this.pageBack = this.pageBack.bind(this);
      this.pageForward = this.pageForward.bind(this);
      this.navigate = this.navigate.bind(this);
      this.setRelativePath = this.setRelativePath.bind(this);
   }

   componentWillMount() {
      this.getData();
   }

   pageBack() {
      if (this.state.list.pagination.skipCount)
      {
         this.state.skipCount -= this.state.maxItems;
         this.getData();
      }
   }

   pageForward() {
      if (this.state.list.pagination.hasMoreItems)
      {
         this.state.skipCount += this.state.maxItems;
         this.getData();
      }
   }

   getData() {
      NodeService.getItems({
         skipCount: this.state.skipCount,
         maxItems: this.state.maxItems,
         relativePath: this.state.relativePath
      })
         .then(response => {
            this.setState({list: response.data.list});
         });
   }

   navigate(item) {
      if (item.entry.isFolder)
      {
         this.state.skipCount = 0;
         this.state.relativePath += `${item.entry.name}/`;
         this.getData();
      }
   }

   setRelativePath(relativePath) {
      this.state.skipCount = 0;
      this.state.relativePath = relativePath;
      this.getData();
   }

   render() {
      return (
         <div>
            <Breadcrumb relativePath={this.state.relativePath}
                        relativePathHandler={this.setRelativePath}></Breadcrumb>
            <Toolbar list={this.state.list} 
                     pageBackHandler={this.pageBack}
                     pageForwardHandler={this.pageForward}></Toolbar>
            <ListView list={this.state.list}
                      navigationHandler={this.navigate}></ListView>
         </div>)
   }
}

export default List;