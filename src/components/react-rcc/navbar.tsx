import { Component } from "react";

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
      <nav className="z-[9999] fixed flex bg-[rgba(0,0,0,0.75)] backdrop-blur-sm border-b-purple-600 border-b-2 top-0 right-4 md:right-6 left-4 md:left-6 rounded-md h-auto px-4 py-2">
        <a className="flex gap-2" href="/">
          <span className="sr-only">logo {appConfig.nav.title}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-8 h-8 text-cyan-500 antialiased"
          >
            <path
              strokeLinecap="round"
              d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
            />
          </svg>
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
