import * as React from "react";
import * as Dropzone from "react-dropzone";

type StateType = {
  files: any[],
  dropzoneActive: boolean,
}

export class FullScreen extends React.Component<null, StateType> {
  constructor() {
    super()
    this.state = {
      files: [],
      dropzoneActive: false
    }
  }

  onDragEnter(file: any) {
    console.log(file.name);
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop(files: any) {
    console.log(files[0]);
    this.setState({
      files,
      dropzoneActive: false
    });

    let data = new FormData();
    data.append('sound', files[0], files[0].name);

    fetch('http://fredrik.hajkep.se/soundboard/upload.php', {
      method: 'POST',
      body: data
    }).then((r) => console.log(r));
  }

  render() {
    const { files, dropzoneActive } = this.state;

    return (
      <Dropzone
        disableClick
        accept = {"audio/mp3"}
        onDrop = {this.onDrop.bind(this)}
        onDragEnter = {this.onDragEnter.bind(this)}
        onDragLeave = {this.onDragLeave.bind(this)}
        className = {dropzoneActive ? "dropzone active" : "dropzone"}
      >
      {this.props.children}
      </Dropzone>
    );
  }
}