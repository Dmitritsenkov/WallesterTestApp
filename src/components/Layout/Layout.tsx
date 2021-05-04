import React from "react";
import classes from "./Layout.module.scss";

interface Props {
    props: any;
}

type LayoutProps = unknown;
const Layout = (props:any) => {
    return (
        <div className={classes.container}>
            {props.children}
        </div>
    );
};

export default Layout;