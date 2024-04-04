

import { eventApi } from "../api/EventApi";

import { Tooltip } from 'antd';

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

import { FiInfo } from "react-icons/fi";

const ctx = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 100, pv: 200, amt: 500 }, { name: 'Page F', uv: 600, pv: 100, amt: 200 },];

const renderLineChart = (
	<LineChart width={600} height={300} data={ctx} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
		<Line type="monotone" dataKey="uv" stroke="#8884d8" />
		<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
		<XAxis dataKey="name" />
		<YAxis />
		<Tooltip />
	</LineChart>
);

export default function DashboardPage() {

	/* 	const [data, setData] = useState<EventType[]>();
	 */
	/* useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await eventApi.getAll();
				setData(response);
			} catch (error) {
				console.error("Err!:", error);
			}
		};

		fetchData();
	}, []); */

	eventApi.getAllByFilter([
		{
			key: "date",
			value: "e"
		},
		{
			key: "name",
			value: "asc"
		},
	]);

	const text = <p>
		<span className="flex gap-x-2 items-center">
			<i className="w-2 h-2 bg-green-500 block rounded-full"></i>
			Concluidos
		</span>
		<span className="flex gap-x-2 items-center">
			<i className="w-2 h-2 bg-blue-500 block rounded-full"></i>
			Em Andamento
		</span>
		<span className="flex gap-x-2 items-center">
			<i className="w-2 h-2 bg-red-500 block rounded-full"></i>
			Cancelados
		</span>
	</p>;

	return (

		<div className="grid grid-cols-12 gap-y-3">
			{/* Total de eventos-> criados, concluidos, cancelados, e ganhos(no total) */}
			<div className="col-span-3">
				<div className="bg-white p-5 rounded-lg border-[1px]">
					<div className="flex flex-col">
						<div className="flex flex-row items-center justify-between w-full">
							<p className="font-semibold">
								Eventos
							</p>
							<Tooltip placement="rightTop" title={text} >
								<FiInfo className="w-5 h-5 opacity-30" />
							</Tooltip>
						</div>
						<div className="">
							<p className="">
								<strong>
									2
								</strong>
								<span></span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="col-span-3">

			</div>
			<div className="col-span-3">

			</div>
			<div className="col-span-3">

			</div>
			<div className="col-span-6">
				<div className="bg-white p-5 rounded-lg border-[1px]">
					{renderLineChart}
				</div>
			</div>
			<div className="col-span-6"></div>
			<div className="col-span-6">
				<div className="bg-white p-5 rounded-lg border-[1px]">
					{/* Recent Add */}
					{/* <div className="flex flex-col gap-y-1">
						{data?.map(el => (
							<div className="bg-slate-50 rounded-md py-3 px-4" key={el.id}>
								<p className="text-xs">
									{el.title}
								</p>
							</div>
						))}
					</div> */}
				</div>
			</div>
			<div className="col-span-8"></div>
		</div>

	);

}