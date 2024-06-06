import WidgetReqUser from "../components/widgetReqUser";

const RequestsUser = ({user}) => {
    return (
        <section className="p-3">
            <div className="flex gap-4">
                <div className="flex-[2_2_0%]">
                    <WidgetReqUser />
                </div>
                {/* <div>
                    <button onClick={() => window.open("./newRequestUser")}>
                        New Request
                    </button>
                </div> */}
            </div>
        </section>
    );
};

export default RequestsUser;
