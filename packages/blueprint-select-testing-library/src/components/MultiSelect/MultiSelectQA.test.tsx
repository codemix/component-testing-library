import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { MenuItem, Button } from "@blueprintjs/core";
import { MultiSelect, ItemRenderer } from "@blueprintjs/select";
import { MultiSelectQA } from "./MultiSelectQA";
import { filmSelectProps, IFilm } from "../../films";

const FilmMultiSelect = MultiSelect.ofType<IFilm>();

afterEach(cleanup);

const Wrapper = ({ disabled, ...extra }: any) => {
  const [films, setFilms] = React.useState<IFilm[]>([]);

  const isFilmSelected = (film: IFilm) => films.includes(film);

  const renderTag = (film: IFilm) => film.title;

  // NOTE: not using Films.itemRenderer here so we can set icons.
  const renderFilm: ItemRenderer<IFilm> = (
    film,
    { modifiers, handleClick }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }

    return (
      <MenuItem
        active={modifiers.active}
        icon={isFilmSelected(film) ? "tick" : "blank"}
        key={film.rank}
        label={film.year.toString()}
        onClick={handleClick}
        text={`${film.rank}. ${film.title}`}
        shouldDismissPopover={false}
      />
    );
  };

  return (
    <FilmMultiSelect
      {...filmSelectProps}
      {...extra}
      itemRenderer={renderFilm}
      noResults={<MenuItem disabled={true} text="No results." />}
      tagRenderer={renderTag}
      selectedItems={films}
      onItemSelect={value =>
        isFilmSelected(value)
          ? setFilms(films.filter(item => item != value))
          : setFilms(films.concat(value))
      }
      popoverProps={{ minimal: true }}
      disabled={disabled}
    />
  );
};

test("MultiSelect", () => {
  const { container } = render(<Wrapper />);

  const component = mount(MultiSelectQA, container);

  component.suggest("incep");

  expect(component.items.map(item => item.text)).toEqual(["14. Inception"]);
  component.selectItemsByText(/Inception/);

  component.suggest("shaw");
  component.selectItemsByText(/Shawshank/);

  expect(component.values).toEqual(["Inception", "The Shawshank Redemption"]);
});
