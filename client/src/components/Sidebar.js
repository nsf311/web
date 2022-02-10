import React, { useState } from "react";
import '../Sidebar.css'

function Sidebar() {
    return (
        <div class="wrapper">
            <div class="sidebar">
                <p>{`Hexagon ${this.props.hex.properties.HEX_600}`}</p>
                <p>{`total_popu: ${this.props.hex.properties.total_popu}`}</p>
            </div>
        </div>
    )
}

export default Sidebar;