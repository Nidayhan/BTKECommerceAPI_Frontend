import ChildPage from "./Child";

export const Parent = () => {

    return (
        <>
        <div>Parent Component</div>
        <ChildPage params={{Id: "some-id", FullName:"Nida AYHAN"}}></ChildPage>
        </>
    );
}