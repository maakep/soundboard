import * as React from "react";
//import * as Dropzone from "react-dropzone";
import { FullScreen } from "./Dropzone/fullscreen";

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
    let prevClipCat: string = "n/a";
    
    return (
      <FullScreen>
        <div className="app-wrapper">
            {clips.map((clip, index) => {
              const newCat = (clip.category !== prevClipCat);
              prevClipCat = clip.category;

              return <Clip
                key = { clip.category + "_" + clip.name }
                name = { clip.name }
                url = { clip.url }
                category = { clip.category }
                newCategory = { newCat }
              />
            })}
      </div>
    </FullScreen>
    )
  }
}