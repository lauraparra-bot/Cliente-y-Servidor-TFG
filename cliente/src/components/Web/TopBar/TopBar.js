import React, { useState, useEffect } from "react";
import { Container, Buttton } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { Icon } from "../../../assets";
import { Menu } from "../../../api";
import "./TopBar.scss";

const menuController = new Menu();

export function TopBar() {
    const [menu, setMenu] = useState(null);


    useEffect(() => {
        (async () => {
            try {
                const response = await menuController.getMenu(true);
                setMenu(response);
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])

    return (
        <div className="top-bar">
            <Container>
                <div className="top-bar__left">
                    <Link to="/" className="logo">
                        SOLICITUD DE TFG
                    </Link>

                    <div className="menu">
                        {map(menu, (item) => (
                            <a key={item._id} href={item.path}>
                                {item.title}
                            </a>
                        ))}


                    </div>
                </div>
            </Container>
        </div>
    )
}