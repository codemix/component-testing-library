import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { MenuItem, Button } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { SelectQA } from "./SelectQA";
import { filmSelectProps, IFilm, TOP_100_FILMS } from "../../films";

const FilmSelect = Select.ofType<IFilm>();

afterEach(cleanup);

const Wrapper = ({ disabled, ...extra }: any) => {
  const [film, setFilm] = React.useState<IFilm>(TOP_100_FILMS[0]);

  return (
    <FilmSelect
      {...filmSelectProps}
      {...extra}
      noResults={<MenuItem disabled={true} text="No results." />}
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
    </FilmSelect>
  );
};
test("Select", () => {
  const { container } = render(<Wrapper />);

  const component = mount(SelectQA, container);

  expect(component.selectedItemText).toBe("The Shawshank Redemption (1994)");

  component.open();
  expect(component.items).toHaveLength(100);

  expect(component.filterText).toBe("");

  component.filterText = "city";
  expect(component.items).toHaveLength(2);

  const item = component.selectedItem;
  expect(item && item.text).toBe("21. City of God");

  component.clearFilter();

  expect(component.items).toHaveLength(100);

  component.selectItemByText(/Inception/);

  expect(component.isOpen).toBe(false);

  expect(component.selectedItemText).toBe("Inception (2010)");
});
