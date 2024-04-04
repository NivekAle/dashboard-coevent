import { DragEvent, useRef, useState } from "react";

export default function DragAndDropFilesCompontent() {

	const [files, setFiles] = useState<any>();
	const inputRef = useRef<any>();

	const handleDragOver = (event: DragEvent) => {
		event.preventDefault();
		console.log("alo");
		document.querySelector("#dropzone")?.classList.add("inDrag");
	}

	const handleDragLeave = (event: DragEvent) => {
		event.preventDefault();
		console.log("alo");
		document.querySelector("#dropzone")?.classList.remove("inDrag");
	}

	const handleDrop = (event: DragEvent) => {
		event.preventDefault();
		console.log("-----------------------");
		setFiles(event.dataTransfer.files);
	}

	if (files) {
		return (
			<div className="p-3 text-center">
				<ul>
					{
						Array.from(files).map((file, i) => <li key={i}>{file.name}</li>)
					}
				</ul>
			</div>
		);
	}

	return (
		<>
			{
				!files && (
					<div className="bg-slate-50 p-4 text-center my-3" onDragOver={handleDragOver} onDrop={handleDrop} id="dropzone" onDragLeave={handleDragLeave}>
						<h1>
							Arraste suas imagens aqui!
						</h1>
						<input type="file" multiple onChange={(e) => setFiles(e.target.files)} ref={inputRef} hidden />
					</div>
				)
			}
		</>
	);
}