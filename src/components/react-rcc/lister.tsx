import { useMotionAnimate } from "@glitchtech-dev/react-motion";
import { Component } from "react";

interface ListerProps {
  initialTS: number;
  maxTikkedMs: number;
  tikInterval: number;
  keepTikking?: boolean;
  message: {
    title: string;
    body: string;
    tikked: number;
  };
}

interface ListerState {
  initialTS: number;
  message: ListerProps["message"];
}

export default class Lister extends Component<ListerProps> {
  state: ListerState;
  animatedOuterDiv: HTMLDivElement | null = null;
  animatedTikker: HTMLSpanElement | null = null;

  constructor(props: ListerProps) {
    super(props);
    this.state = {
      initialTS: props.initialTS,
      message: props.message ?? {
        title: "No title",
        body: "No body",
        tikked: 0,
      },
    };
  }

  componentDidMount() {
    if (this.animatedOuterDiv) {
      useMotionAnimate(
        this.animatedOuterDiv,
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
      useMotionAnimate(
        this.animatedTikker,
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
  }

  render() {
    return (
      <div
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
