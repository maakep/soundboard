import * as React from "react";

import { Clip } from "./Clip";

export type ClipType = {
  url: string,
  name: string,
  category: string,
}

type StateType = {
  clips: ClipType[],
}

export class App extends React.Component<null, StateType> {
  constructor(props: null) {
    super(props);

    fetch("http://fredrik.hajkep.se/soundboard/json.php")
    .then((r) => r.json()
      .then((r) => {
        const clipList: ClipType[] = r.sort(this.compare);
        this.setState({clips: clipList});
      })
    );


    // Loading spinner or something instead pls
    const defaultClips: ClipType[] = [{url: "", name: "Loading", category: "Loading"}];
    this.state = {
      clips: defaultClips,
    };
  }

  compare(a: ClipType, b: ClipType) {
    if (a.category < b.category)
      return -1;
    if (a.category > b.category)
      return 1;
    return 0;
  }

  render() {
    const clips = this.state.clips;
    let prevClip: ClipType = null;
    
    return (
      <div className="app-wrapper">
          {clips.map((clip, index) => {
            prevClip = clip;

            return <Clip
              key = { clip.category + "_" + clip.name }
              name = { clip.name }
              url = { clip.url }
              category = { clip.category }
              newCategory = { clip.category !== prevClip.category }
            />
          })}
    </div>
    )
  }
}