import { DragEvent, useRef, useState } from "react";

type DragAndDropFilesComponentProps = {
	onChange: (files: File[]) => void;
};

export default function DragAndDropFilesComponent({ onChange }: DragAndDropFilesComponentProps) {

	const [files, setFiles] = useState<File[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleDragOver = (event: DragEvent) => {
		event.preventDefault();
		document.querySelector("#dropzone")?.classList.add("inDrag");
	}

	const handleDragLeave = (event: DragEvent) => {
		event.preventDefault();
		document.querySelector("#dropzone")?.classList.remove("inDrag");
	}

	const handleDrop = (event: DragEvent) => {
		event.preventDefault();
		const newFiles = Array.from(event.dataTransfer.files);
		setFiles(newFiles);
		onChange(newFiles);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const newFiles = Array.from(event.target.files);
			setFiles(newFiles);
			onChange(newFiles);
		}
	};

	const handleRemoveImage = (index: number) => {
		const newFiles = [...files];
		newFiles.splice(index, 1);
		setFiles(newFiles);
	}

	return (
		<div className="p-3 text-center">
			{
				files.length > 0 ? (
					<div>
						<ul className="flex flex-wrap justify-between">
							{files.map((file, i) => (
								<li key={i} className="my-2">
									<div>
										<img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-44 max-w-xs mx-auto object-contain border-2 rounded-md border-orange-400 border-dashed mb-2" />
										<p>{file.name}</p>
										<button type="button" onClick={() => handleRemoveImage(i)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
											Remover Imagem
										</button>
									</div>
								</li>
							))}
						</ul>
						<button type="button" onClick={() => setFiles([])} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
							Remover Todas as Imagens
						</button>
					</div>
				) : (
					<div className="bg-slate-50 p-4 text-center my-3 min-h-52 flex items-center justify-center border-dashed border-[2px] border-slate-300 rounded-lg flex-col"
						onDragOver={handleDragOver} onDrop={handleDrop} id="dropzone" onDragLeave={handleDragLeave}>
						<p className="text-xs text-slate-400">
							Arraste suas imagens aqui!
						</p>
						<input type="file" multiple onChange={handleFileChange} ref={inputRef} hidden />
						<button type="button" onClick={() => inputRef.current?.click()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
							Selecione Imagens
						</button>
					</div>
				)
			}
		</div>
	);
}
