import $ from "jquery";

const JQueryItem = () => {
  if (typeof window !== "undefined") {
    $(() => {
      $("button#jquery-clicker").on("click", function () {
        const clickCounter = $("span#jquery-times-clicked");
        const timesClicked = parseInt(clickCounter.text());

        clickCounter.animate({ opacity: 0 }, 200, () => {
          if (timesClicked >= 10) {
            clickCounter.removeClass("text-cyan-300");
            clickCounter.addClass("text-red-500");
          } else if (!clickCounter.hasClass("text-cyan-300")) {
            clickCounter.removeClass("text-white");
            clickCounter.addClass("text-cyan-300");
          }

          clickCounter.animate({ opacity: 1 }, 300);
        });

        clickCounter.text(timesClicked + 1);
      });
    });
  }

  return (
    <div className="flex gap-4 mx-auto flex-col">
      <div>
        <span>You've clicked </span>
        <span id="jquery-times-clicked" className="text-white">
          0
        </span>
        <span> times</span>
      </div>

      <button
        id="jquery-clicker"
        className="mx-auto rounded border-2 px-4 py-3 text-sm hover:border-white hover:bg-white hover:font-bold hover:text-purple-800"
      >
        Click me
      </button>
    </div>
  );
};

export default JQueryItem;
