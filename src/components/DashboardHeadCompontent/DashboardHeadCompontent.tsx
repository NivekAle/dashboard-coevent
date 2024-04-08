
import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";


type BreadCrumbItemType = {
	link: string;
	label: string;
}

type DashboardHeadProps = {
	title: string;
	description: string;
	breadCrumb: {
		items: BreadCrumbItemType[],
		currentPage?: string
	};
}

export default function DashboardHeadComponent({ breadCrumb, description, title }: DashboardHeadProps) {


	return (
		<header>
			<div className=" px-5 py-2 rounded-lg  mb-4">
				<p className="text-xs font-semibold mb-3" key={1}>
					<span className="inline-block">
						<Link to={"/dashboard"}>
							<FaHome />
						</Link>
					</span>
					&nbsp;
					/
					&nbsp;
					{breadCrumb.items.map(((bread, i) => {
						return (
							<React.Fragment key={`bread-${i}`}>
								<span>
									{breadCrumb.currentPage ? (
										<Link to={bread.link}>
											{bread.label}
										</Link>
									) : bread.label}
								</span>
								{i !== breadCrumb.items.length - 1 && (
									<span>&nbsp; / &nbsp;</span>
								)}
							</React.Fragment>
						);
					}))}
					{
						breadCrumb.currentPage && (
							<>
								&nbsp; / &nbsp;
								<span className="text-orange-500">{breadCrumb.currentPage}</span>
							</>
						)
					}
				</p>

				<h2 className="font-semibold text-2xl mb-3">
					{title}
				</h2>
				<p className="max-w-4xl">
					{description}
				</p>
			</div >
		</header >
	);

}