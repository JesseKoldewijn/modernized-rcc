import { Component } from "react";
import { BiLogoReact } from "react-icons/bi";

import { appConfig } from "@/config/app";

interface NavbarProps {
  pathname: string;
}

export default class Navbar extends Component<NavbarProps> {
  constructor(props: NavbarProps) {
    super(props);
  }

  render() {
    return (
      <nav className="fixed flex bg-[rgba(0,0,0,0.5)] border-b-purple-600 border-b-2 top-0 right-6 left-6 rounded-md h-auto px-4 py-2">
        <a className="flex gap-2" href="/">
          <span className="sr-only">logo {appConfig.nav.title}</span>
          <BiLogoReact size={40} className="my-auto fill-cyan-400" />
          <span className="my-auto hidden md:block">{appConfig.nav.title}</span>
        </a>
        <div className="ml-auto mr-2 flex gap-6">
          {appConfig.nav.links.map((link) => (
            <a
              key={link.href + "nav_link"}
              className={
                "flex gap-2 my-auto hover:text-white" +
                (this.props.pathname == link.href ? " text-white" : "")
              }
              href={link.href}
              aria-current={this.props.pathname == link.href}
              rel="prefetch"
            >
              {link.name}
            </a>
          ))}{" "}
        </div>
      </nav>
    );
  }
}
