const Filter = ({ filter, setFilter, filterOpen }) => {
	return (
		<div
			className={`${filterOpen ? "block" : "hidden"} p-5 my-5 gap-1 absolute bg-white border border-gray-300 rounded right-0 box-content w-128`}
		>
			<h2 className="text-2xl font-bold">Szűrők</h2>
			<div className="flex flex-wrap gap-5">
				<div className="flex justify-evenly gap-4 w-full">
					<div className="flex flex-col w-1/2">
						<label className="font-bold">Fizetési sáv alja</label>
						<input
							type="number"
							min={0}
							className="p-2 border border-gray-300 rounded w-full"
							onChange={(e) =>
								setFilter({
									...filter,
									salaryFrom:
										e.target.value === "" ? null : parseInt(e.target.value),
								})
							}
						/>
					</div>
					<div className="flex flex-col w-1/2">
						<label className="font-bold">Fizetési sáv teteje</label>
						<input
							type="number"
							min={0}
							className="p-2 border border-gray-300 rounded w-full"
							onChange={(e) =>
								setFilter({
									...filter,
									salaryTo:
										e.target.value === "" ? null : parseInt(e.target.value),
								})
							}
						/>
					</div>
				</div>
				<div className="flex justify-evenly gap-4 w-full">
					<div className="flex flex-col w-1/3 justify-between">
						<label className="font-bold">Foglalkoztatás típusa</label>
						<div className="grid grid-cols-[80%_20%] grid-rows-3 gap-1">
							<label>Teljes munkaidő</label>
							<input
								type="checkbox"
								className="w-6 h-6 border border-gray-300 rounded"
								onChange={(e) => {
									if (e.target.checked) {
										setFilter({
											...filter,
											type: [...filter.type, "full-time"],
										});
									} else {
										setFilter({
											...filter,
											type: filter.type.filter((type) => type !== "full-time"),
										});
									}
								}}
							/>
							<label>Rész munkaidő</label>
							<input
								type="checkbox"
								className="w-6 h-6 border border-gray-300 rounded"
								onChange={(e) => {
									if (e.target.checked) {
										setFilter({
											...filter,
											type: [...filter.type, "part-time"],
										});
									} else {
										setFilter({
											...filter,
											type: filter.type.filter((type) => type !== "part-time"),
										});
									}
								}}
							/>
							<label>Gyakornok</label>
							<input
								type="checkbox"
								className="w-6 h-6 border border-gray-300 rounded"
								onChange={(e) => {
									if (e.target.checked) {
										setFilter({
											...filter,
											type: [...filter.type, "internship"],
										});
									} else {
										setFilter({
											...filter,
											type: filter.type.filter((type) => type !== "internship"),
										});
									}
								}}
							/>
						</div>
					</div>
					<div className="flex flex-col justify-between w-2/3 gap-1">
						<div>
							<label className="font-bold">Település</label>
							<input
								type="text"
								className="p-2 border border-gray-300 rounded w-full"
								onChange={(e) =>
									setFilter({
										...filter,
										city: e.target.value === "" ? null : e.target.value,
									})
								}
							/>
						</div>
						<div>
							<label className="font-bold">Home office</label>
							<div className="flex items-center gap-4 w-full">
								<label htmlFor="homeOfficeTrue">
									<input
										type="radio"
										name="homeOffice"
										id="homeOfficeTrue"
										onChange={(e) => setFilter({ ...filter, homeOffice: 1 })}
									/>
									Igen
								</label>
								<label htmlFor="homeOfficeFalse">
									<input
										type="radio"
										name="homeOffice"
										id="homeOfficeFalse"
										onChange={(e) => setFilter({ ...filter, homeOffice: 0 })}
									/>
									Nem
								</label>
								<label htmlFor="homeOfficeAny">
									<input
										type="radio"
										name="homeOffice"
										id="homeOfficeAny"
										defaultChecked
										onChange={(e) => setFilter({ ...filter, homeOffice: null })}
									/>
									Nem számít
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Filter;
