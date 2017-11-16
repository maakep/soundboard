import * as React from "React";

type PropType = {
  search: (str: string) => void;
}

type StateType = {
}

export class Search extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);

    this.state = {

    };
  }

  searchPerformed(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.currentTarget.value;
    this.props.search(text);
  }

  render() {
    return (
      <input 
        type={"text"} 
        onChange={(e) => this.searchPerformed(e)} 
        className={"search-input"}
        autoFocus 
      />
    );
  }
}