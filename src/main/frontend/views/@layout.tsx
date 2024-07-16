import {NavLink, Outlet} from "react-router-dom";
import { AppLayout } from '@vaadin/react-components/AppLayout.js';
import { DrawerToggle } from '@vaadin/react-components/DrawerToggle.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Scroller } from '@vaadin/react-components/Scroller.js';
import { SideNav, type SideNavElement } from '@vaadin/react-components/SideNav.js';
import { SideNavItem } from '@vaadin/react-components/SideNavItem.js';
import {useEffect, useRef} from "react";
import '@vaadin/icons';
import '../assets/chatbot.png'

const h1Style = {
    fontSize: 'var(--lumo-font-size-l)',
    margin: 0,
};

export default function Layout(){
    const sideNavRef = useRef<SideNavElement>(null);

    useEffect(() => {
    }, [sideNavRef.current]);
    return (
        <AppLayout>
            <DrawerToggle slot="navbar" >
                <Icon icon="vaadin:lines-list"/>
            </DrawerToggle>
            <h1 slot="navbar" style={h1Style}>
                ChatBot RAG App
            </h1>
            <Scroller slot="drawer" className="p-s">
                <SideNav>
                    <SideNavItem path="/">
                        <Icon icon="vaadin:home" slot="prefix" />
                        Home
                    </SideNavItem>
                    <SideNavItem path="/chatbot">
                        <Icon icon="vaadin:chat" slot="prefix" />
                        Chatbot
                    </SideNavItem>
                    <SideNavItem path="/person">
                        <Icon icon="vaadin:user" slot="prefix" />
                        Person
                    </SideNavItem>
                </SideNav>
            </Scroller>
            <div className="p-l">
                <Outlet></Outlet>
            </div>
        </AppLayout>
    );
}