import React from "react";
import BreadcrumbUtil from "alfresco-js-utils/lib/utils/navigation/Breadcrumbs";

class Breadcrumb extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         breadcrumbs: [
            {
               label: "Home",
               relativePath: props.relativePath
            }
         ]
      };
   }

   componentWillReceiveProps(nextProps) {
      let breadcrumbData = BreadcrumbUtil.createBreadcrumbs({
         relativePath: nextProps.relativePath
      });
      this.setState({
         breadcrumbs: breadcrumbData.breadcrumbs
      });
   }

   render() {
      return (<nav role="navigation">
         <p id="breadcrumblabel">You are here: {this.props.relativePath}</p>
         <ol id="breadcrumb" aria-labelledby="breadcrumblabel">{this.state.breadcrumbs.map((breadcrumb) => 
            <li role="link" onClick={() => this.props.relativePathHandler(breadcrumb.relativePath)}>{breadcrumb.label}</li>)}</ol>
      </nav>)
   }
}

export default Breadcrumb;