import React, { ReactNode, useState } from "react";
import { cn } from "~/utils/classNames";

// #region
function extractText(children: ReactNode | ReactNode[]): string {
  let text = "";

  React.Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      text += child.toString();
    } else if (React.isValidElement(child)) {
      text += extractText(child.props.children);
    }
    // Other types such as boolean or null are ignored as they don't contain meaningful text
  });

  return text;
}

function KbdToIpa(input: string): string {
  let output = input.toLowerCase();

  output = output.replace(/i|l|Ӏ/g, "ӏ");

  output = output
    .replace(/жь/g, "ʑ")
    .replace(/дж/g, "d͡ʒ")
    .replace(/ж/g, "ʒ")
    .replace(/дз/g, "d͡z")
    .replace(/лъ/g, "ɬ")
    .replace(/лӏ/g, "ɬʼ")
    .replace(/фӏ/g, "fʼ")
    .replace(/кхъу/g, "q͡χʷ")
    .replace(/кхъ/g, "q͡χ")
    .replace(/кӏу/g, "kʷʼ")
    .replace(/кӏ/g, "t͡ʃʼ")
    .replace(/къу/g, "qʷ")
    .replace(/ку/g, "kʷ")
    .replace(/къ/g, "q")
    .replace(/гъу/g, "ʁʷ")
    .replace(/гъ/g, "ʁ")
    .replace(/ху/g, "xʷ")
    .replace(/хъу/g, "χʷ")
    .replace(/хъ/g, "χ")
    .replace(/хь/g, "ħ")
    .replace(/шӏ/g, "ʃʼ")
    .replace(/щӏ/g, "ɕʼ")
    .replace(/цӏ/g, "t͡sʼ")
    .replace(/ӏу/g, "ʔʷ")
    .replace(/ӏ/g, "ʔ")
    .replace(/а/g, "aː")
    .replace(/э/g, "a")
    .replace(/ы/g, "ə")
    .replace(/о/g, "aw")
    .replace(/е/g, "aj")
    .replace(/и/g, "əj")
    .replace(/й/g, "j")
    .replace(/у/g, "əw")
    .replace(/я/g, "jaː");

  // Simple phonetic replacements (putting these after more complex replacements)
  output = output
    .replace(/л/g, "ɮ")
    .replace(/ф/g, "f")
    .replace(/ку/g, "kʷ")
    .replace(/к/g, "k")
    .replace(/гу/g, "gʷ")
    .replace(/г/g, "ɣ")
    .replace(/ху/g, "xʷ")
    .replace(/х/g, "x")
    .replace(/ш/g, "ʃ")
    .replace(/щ/g, "ɕ")
    .replace(/ц/g, "t͡s")
    .replace(/с/g, "s")
    .replace(/з/g, "z")
    .replace(/м/g, "m")
    .replace(/н/g, "n")
    .replace(/д/g, "d")
    .replace(/р/g, "r")
    .replace(/т/g, "t")
    .replace(/б/g, "b")
    .replace(/п/g, "p");

  // Context-sensitive replacements
  output = output.replace(/(^|[^ʷʼ\w])əw/g, "$1wə");
  output = output.replace(/(^|[^ʷʼ\w])əj/g, "$1jə");
  output = output.replace(/(^|[^ʷʼ\w])aj/g, "$1ja");
  output = output.replace(/əa/g, "a");
  output = output.replace(/aə/g, "a");
  output = output.replace(/jj/g, "j"); // Replaces 'jj' with 'j'

  const consonants = "ɮfʔkɣxʃɕt͡st͡sɡʁχħʒʑdʒɬmnrbdptʷ";
  output = output.replace(new RegExp(`([${consonants}]ʷ)([${consonants}])`, "g"), "$1ə$2");

  return output;
}
// #endregion

// TODO(artur): Find better name, preferably short, as it should be used a lot whenever some highlighting is needed.
export function HighlightText({ children }: { children: ReactNode }) {
  return <span className="font-bold text-blue-500">{children}</span>;
}

function HoverBox({ children }: { children: ReactNode }) {
  return (
    <div className="absolute bottom-full left-0 mb-2 whitespace-nowrap rounded border bg-white p-2 shadow-lg">
      {children}
    </div>
  );
}

export function TranslateText({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        textDecoration: "underline dotted",
        textDecorationThickness: "0.1rem", // Increase the thickness of the dots
        textDecorationStyle: "dotted",
        textUnderlineOffset: "5px", // Adjusts the spacing between text and underline
      }}
      className="text-black-500"
    >
      {children}
    </span>
  );
  // return <span className="text-black-500 italic underline decoration-dotted leading-5">{children}</span>;
}

export function CText({
  children,
  d,
  className,
}: {
  children: ReactNode | ReactNode[];
  d: "w" | "e";
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span className="relative">
      <span
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn("text-black-500 font-bold", className)}
      >
        {children}
      </span>
      {/*
        NOTE(artur): The orthography is not 100% phonetic, thus it is not possible to 
                     generate completely correct IPA 100% all the time. 
                     For example пI could either mean /p'/ or /p?/, depending on the word.
                     For this one should also probably a small link to some orthography guide. 
        TODO(artur): The hoverbox should contain a link to the transliteration rules. That link 
                     should also explain some inaccuracies that can arise.

      */}
      {isHovered && <HoverBox>{"/" + KbdToIpa(extractText(children)) + "/"}</HoverBox>}
    </span>
  );
}

// TODO(artur): Make better breakpoints.
export function GrammarBookContainer({ children }: { children: React.ReactNode }) {
  return <div className="md m-2 mx-auto w-[97%] bg-white p-4 md:max-w-screen-md">{children}</div>;
}

//SNIPPET:
// <ExampleListContainer>
//   <SimpleTranslationExample>
//     <></>
//     <></>
//   </SimpleTranslationExample>
// </ExampleListContainer>;

// TODO(artur): Western and Eastern should be differently color-coded. The idea is western==green, eastern==blue.
// TODO(artur): Think about whether this container should be only for western and eastern or whether one can use this one also for other languages
//              like English, Russian, etc, to provide comparison.
export function ExampleListContainer({ children }: { children: ReactNode[] | ReactNode }) {
  enum DisplayState {
    Default,
    Expanded,
    Collapsed,
  }

  const toggleButtons = [
    { state: DisplayState.Default, text: "Default" },
    { state: DisplayState.Expanded, text: "Expanded" },
    { state: DisplayState.Collapsed, text: "Collapsed" },
  ];

  const [displayState, setDisplayState] = useState<DisplayState>(DisplayState.Default);
  const maxDefaultLength = 3;

  const dialect: "east" | "west" = "east";

  let colorBackground;
  let colorText;
  if (dialect === "east") {
    colorBackground = "border-blue-500 bg-blue-100";
    colorText = "text-blue-500 hover:text-blue-700";
  } else {
    colorBackground = "border-green-500 bg-green-100";
    colorText = "text-green-500 hover:text-green-700";
  }

  const renderChildren = () => {
    if (displayState === DisplayState.Collapsed) {
      return null;
    }

    if (!Array.isArray(children)) {
      return <li>{children}</li>;
    }

    if (children.length > maxDefaultLength) {
      const visibleChildren =
        displayState === DisplayState.Default ? children.slice(0, maxDefaultLength) : children;
      const stateOnClick =
        displayState === DisplayState.Default ? DisplayState.Expanded : DisplayState.Default;

      return (
        <>
          {visibleChildren.map((child, index) => (
            <li key={index}>{child}</li>
          ))}

          <span
            key="more"
            className={`mt-4 cursor-pointer items-center text-center font-bold ${colorText}`}
            onClick={() => setDisplayState(stateOnClick)}
          >
            <div className="rotate-90">...</div>
            <div>
              {displayState === DisplayState.Default ? (
                <>{children.length - maxDefaultLength} more examples</>
              ) : (
                <>less examples</>
              )}
            </div>
          </span>
        </>
      );
    } else {
      return children.map((child, index) => <li key={index}>{child}</li>);
    }
  };

  return (
    <div className={`rounded border ${colorBackground} shadow`}>
      <div className={`flex items-center justify-end border-b ${colorBackground} p-0 text-xs`}>
        {toggleButtons.map(({ state, text }) => (
          <span
            key={state}
            className={`cursor-pointer ${displayState === state ? "font-bold" : ""}`}
            onClick={() => setDisplayState(state)}
          >
            {text}
          </span>
        ))}
      </div>
      <ul
        className={`list-inside list-disc p-4 ${displayState === DisplayState.Collapsed ? "hidden" : ""}`}
      >
        {renderChildren()}
      </ul>
    </div>
  );
}

export function SimpleTranslationExample({
  children,
  d,
}: {
  children: [React.ReactNode, React.ReactNode];
  d: "w" | "e";
}) {
  return (
    <>
      <CText d={d}>{children[0]}</CText> - <TranslateText>{children[1]}</TranslateText>
    </>
  );
}

type TableCell = string | Exclude<ReactNode, null>;

export class Table {
  constructor(rowHeaders: string[], columnHeaders: string[]) {
    this.rowHeaders = rowHeaders;
    this.columnHeaders = columnHeaders;
    this.table = new Array(rowHeaders.length)
      .fill(null)
      .map(() => new Array(columnHeaders.length).fill(null));
  }

  setNameInUpperLeftCorner(name: string) {
    this.upperLeftCornerName = name;
  }

  setCell(rowName: string, columnName: string, value: TableCell) {
    const rowIndex = this.rowHeaders.indexOf(rowName);
    const columnIndex = this.columnHeaders.indexOf(columnName);
    if (rowIndex === -1 || columnIndex === -1) {
      throw new Error("Row or column not found");
    }
    this.table[rowIndex][columnIndex] = value;
  }
  getCell(rowName: string, columnName: string): TableCell | null {
    const rowIndex = this.rowHeaders.indexOf(rowName);
    const columnIndex = this.columnHeaders.indexOf(columnName);
    if (rowIndex === -1 || columnIndex === -1) {
      throw new Error("Row or column not found");
    }
    return this.table[rowIndex][columnIndex];
  }

  rowHeaders: string[];
  columnHeaders: string[];
  table: (TableCell | null)[][];
  upperLeftCornerName: string = "";
}

//TODO(artur): Add that if one hovers over cell [x][y] then the row x and column y should be highlighted including the headers.
//             Consider whether only headers should be highlighted or the whole row/column.
//TODO(artur): Add a toggle button to show/hide the whole table.
//TODO(artur): Consider whether the column headers should be sticky. This would allow for better navigation in bigger tables with many rows.
//TODO(artur): Extract this function into a React Component.
export function MorphologyTable({ data }: { data: Table }): ReactNode {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  const cellClasses = "border px-4 py-2";
  const nullCellClasses = "bg-gray-300 text-gray-500";

  // the text of headerClasses should be bold
  const headerClasses = "bg-orange-100 font-bold";
  const headerClassesHover = "bg-orange-200 font-bold";

  const hoverClasses = "bg-gray-200";

  return (
    <div className="overflow-x-auto">
      <table className="mb-4 w-full min-w-[600px] border-collapse overflow-hidden rounded-lg border border-gray-400 shadow-lg">
        <thead>
          <tr>
            <th className={`${cellClasses} ${headerClasses}`}>{data.upperLeftCornerName}</th>
            {data.columnHeaders.map((header, index) => (
              <th
                key={index}
                className={`${cellClasses} ${hoveredCol == index ? headerClassesHover : headerClasses}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rowHeaders.map((rowHeader, rowIndex) => (
            <tr key={rowIndex}>
              <td
                className={`${cellClasses} ${hoveredRow == rowIndex ? headerClassesHover : headerClasses}`}
              >
                {rowHeader}
              </td>

              {data.table[rowIndex].map((cell, cellIndex) => (
                // TODO(artur): Add that null cells are greyed out
                <td
                  key={cellIndex}
                  className={`${cellClasses} ${cell === null ? nullCellClasses : ""} ${
                    hoveredRow === rowIndex || hoveredCol === cellIndex ? hoverClasses : ""
                  }`}
                  onMouseEnter={() => {
                    setHoveredRow(rowIndex);
                    setHoveredCol(cellIndex);
                  }}
                  onMouseLeave={() => {
                    setHoveredRow(null);
                    setHoveredCol(null);
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
