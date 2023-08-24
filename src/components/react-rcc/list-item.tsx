import { useMotionAnimate } from "@glitchtech-dev/react-motion";
import { Component } from "react";

interface ListItemProps {
  itemKey?: number;
  maxTikkedMs: number;
  tikInterval: number;
  keepTikking?: boolean;
  message: {
    title: string;
    body: string;
    tikked: number;
  };
}

interface ListItemState {
  initialTS: number;
  visible: boolean;
  message: ListItemProps["message"];
}

export default class ListItem extends Component<ListItemProps> {
  state: ListItemState;
  animatedOuterDiv: HTMLDivElement | null = null;
  animatedTikker: HTMLSpanElement | null = null;

  constructor(props: ListItemProps) {
    super(props);
    this.state = {
      initialTS: new Date().getTime(),
      visible: false,
      message: props.message ?? {
        title: "No title",
        body: "No body",
        tikked: 0,
      },
    };
  }

  isInViewport(elem: HTMLDivElement | HTMLSpanElement) {
    const bounding = elem.getBoundingClientRect();

    const isInViewPortBoolean =
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth);

    const stateClone = { ...this.state };

    stateClone.visible = isInViewPortBoolean;

    this.setState(stateClone);

    return isInViewPortBoolean;
  }

  runAnimation(elem: HTMLDivElement | HTMLSpanElement) {
    useMotionAnimate(
      elem,
      {
        opacity: ["0", "1"],
      },
      {
        easing: "ease-in-out",
        duration: 0.25,
        allowWebkitAcceleration: true,
      },
    );
  }

  viewportHandler(el: IntersectionObserverEntry[]) {
    if (!el[0].target || this.state.visible) return;

    const isInViewportBool = this.isInViewport(el[0].target as HTMLDivElement);

    if (!this.state.visible && isInViewportBool) {
      this.runAnimation(el[0].target as HTMLDivElement);
    }
  }

  componentDidMount() {
    if (this.animatedOuterDiv) {
      if (this.state.visible) return;
      let observer = new IntersectionObserver(
        (el) => this.viewportHandler(el),
        {
          root: null,
          rootMargin: "0px",
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        },
      );

      observer.observe(this.animatedOuterDiv);
    }

    const subscription = setInterval(() => {
      if (
        this.state.message.tikked > this.props.maxTikkedMs &&
        !this.props.keepTikking
      )
        return;
      const tikked = new Date().getTime();
      const stateClone = { ...this.state };

      stateClone.message.tikked = tikked - Number(this.state.initialTS);

      this.setState(stateClone);
    }, this.props.tikInterval);

    () => clearInterval(subscription);
  }

  tikkedOverflow() {
    return this.state.message.tikked > this.props.maxTikkedMs;
  }

  componentDidUpdate() {
    if (this.animatedTikker) {
      this.runAnimation(this.animatedTikker);
    }
  }

  render() {
    return (
      <div
        key={this.props.itemKey + "_listItem"}
        className="mx-auto w-full rounded border-2 border-gray-300 px-3 py-4 flex flex-col gap-2"
        ref={(el) => {
          if (el) this.animatedOuterDiv = el;
        }}
        style={{ opacity: 0 }}
      >
        <strong>{this.state.message.title}</strong>
        <p>{this.state.message.body}</p>
        <p>
          Rendered for:{" "}
          <span
            style={
              this.state.message.tikked > this.props.maxTikkedMs
                ? { color: "red" }
                : undefined
            }
            ref={(el) => {
              if (el) this.animatedTikker = el;
            }}
          >
            {this.state.message.tikked ?? 0}
          </span>
          ms
        </p>
      </div>
    );
  }
}
