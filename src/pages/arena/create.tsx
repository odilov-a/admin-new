import { Spin, notification } from "antd";
import { Field } from "formik";
import { useHooks } from "hooks";
import { Container } from "modules";
import { Fields, Button } from "components";

const Arena = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
  let data = createModal.data && createModal?.data;
  return (
    <div>
      <Container.Form
        url={data._id ? `/arena/${get(data, "_id")}` : "/arena"}
        method={data._id ? "put" : "post"}
        name="arena"
        fields={[
          {
            type: "string",
            required: true,
            name: "titleUz",
            value: get(data, "titleUz"),
          },
          {
            type: "string",
            required: true,
            name: "titleRu",
            value: get(data, "titleRu"),
          },
          {
            type: "string",
            required: true,
            name: "titleEn",
            value: get(data, "titleEn"),
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["arena"] });
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          notification.error({
            message: get(error, "errorMessage", t("Something went wrong!")),
            duration: 2,
          });
        }}
      >
        {({ isLoading }) => {
          return (
            <Spin spinning={isLoading} tip={t("Verifying")}>
              <div className="mt-5">
                <Field
                  required
                  name="titleUz"
                  component={Fields.Input}
                  rootClassName="mb-[10px]"
                  label={t("arena uzbek")}
                  placeholder={t("arena uzbek")}
                />
                <Field
                  required
                  name="titleRu"
                  component={Fields.Input}
                  rootClassName="mb-[10px]"
                  label={t("arena rus")}
                  placeholder={t("arena rus")}
                />
                <Field
                  required
                  name="titleEn"
                  component={Fields.Input}
                  rootClassName="mb-[10px]"
                  label={t("arena eng")}
                  placeholder={t("arena eng")}
                />
                <Button
                  size="large"
                  title={t("Save")}
                  htmlType="submit"
                  className="w-full mt-[10px]"
                />
              </div>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Arena;
