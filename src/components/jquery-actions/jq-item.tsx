import $ from "jquery";

const JQueryItem = () => {
  if (typeof window !== "undefined") {
    $(() => {
      $("button#jquery-clicker").on("click", function (e) {
        const clickCounter = $("span#jquery-times-clicked");
        const timesClicked = parseInt(clickCounter.text());
        clickCounter.animate({ opacity: 0 }, 200, () => {
          clickCounter.animate({ opacity: 1 }, 300);
        });
        clickCounter.text(timesClicked + 1);
      });
    });
  }

  return (
    <div className="flex gap-2 mx-auto flex-col">
      <div>
        <span>You've clicked </span>
        <span id="jquery-times-clicked" className="text-cyan-300">
          0
        </span>
        <span> times</span>
      </div>

      <button id="jquery-clicker" className="hover:cursor-pointer select-none">
        Click me
      </button>
    </div>
  );
};

export default JQueryItem;
