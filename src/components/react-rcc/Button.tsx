import { Component, type MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface NavigationButtonProps {
  isLink?: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  navBack?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default class NavigationButton extends Component<NavigationButtonProps> {
  render() {
    const isLink = this.props.isLink ?? false;
    const navBack = this.props.navBack ?? false;
    const classNamesMerged = this.props.className
      ? twMerge(
          this.props.className +
            "mx-auto rounded border-2 px-4 py-3 text-sm hover:border-white hover:bg-white hover:font-bold hover:text-purple-800",
        )
      : "mx-auto rounded border-2 px-4 py-3 text-sm hover:border-white hover:bg-white hover:font-bold hover:text-purple-800";

    if (isLink) {
      return (
        <a className={classNamesMerged} href={this.props.href ?? undefined}>
          {this.props.children ?? ""}
        </a>
      );
    } else {
      return (
        <button
          className={classNamesMerged}
          onClick={
            this.props.onClick ?? navBack
              ? () => window.history.back()
              : undefined
          }
        >
          {this.props.children ?? ""}
        </button>
      );
    }
  }
}
