import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { MenuItem, Button } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/select";
import { SuggestQA } from "./SuggestQA";
import { filmSelectProps, IFilm, TOP_100_FILMS } from "../../films";

const FilmSuggest = Suggest.ofType<IFilm>();

afterEach(cleanup);

const Wrapper = ({ disabled, ...extra }: any) => {
  const [film, setFilm] = React.useState<IFilm>(TOP_100_FILMS[0]);

  return (
    <FilmSuggest
      {...filmSelectProps}
      {...extra}
      noResults={<MenuItem disabled={true} text="No results." />}
      inputValueRenderer={(film: IFilm) => film.title}
      onItemSelect={value => setFilm(value)}
      popoverProps={{ minimal: true }}
      disabled={disabled}
    >
      <Button
        icon="film"
        rightIcon="caret-down"
        text={film ? `${film.title} (${film.year})` : "(No selection)"}
        disabled={disabled}
      />
    </FilmSuggest>
  );
};
test("Suggest", () => {
  const { container } = render(<Wrapper />);

  const component = mount(SuggestQA, container);

  expect(component.value).toBe("");

  component.suggest("incep");

  expect(component.items.map(item => item.text)).toEqual(["14. Inception"]);

  component.suggest("shaw");
  component.selectItemByText(/Shawshank/);

  expect(component.value).toBe("The Shawshank Redemption");
});
