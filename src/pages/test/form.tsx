// import { useState } from "react";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Field } from "formik";

import { Fields, Button } from "components";
// import { helpers, utils } from "services";
import { useHooks } from "hooks";
import { gen4 } from "services/helpers";
import { Checkbox } from "antd";

const Form = ({ setFieldValue, values }: any) => {
  const { get, t } = useHooks();

  const removeMultiBox = (uid: any) => {
    const newArray = values.questions.filter((f: any) => f.uid !== uid);
    setFieldValue("questions", newArray);
  };

  const addMultiBox = () => {
    setFieldValue("questions", [
      ...values.questions,
      {
        // productId: null,
        uid: gen4(),
        answers: [
          { answerUz: "", answerRu: "", answerEn: "", isCorrect: false },
        ],
      },
    ]);
  };

  const removeAnsBox = (uid: any, ansId: any) => {
    values.questions.map((item: any, idx: number) => {
      if (uid === item.uid) {
        const newArray = get(values.questions[idx], "answers").filter(
          (f: any) => f.uid !== ansId
        );
        setFieldValue(`questions[${idx}]answers`, newArray);
      }
    });
  };

  const addAnsBox = (uid: any) => {
    values.questions.map((item: any, idx: number) => {
      if (uid === item.uid) {
        setFieldValue(`questions[${idx}]answers`, [
          ...values.questions[idx].answers,
          {
            uid: gen4(),
            answerUz: "",
            answerRu: "",
            answerEn: "",
            isCorrect: false,
          },
        ]);
      }
    });
  };

  return (
    <>
      <div>
        <div className="flex justify-between mb-[30px]">
          <div className="w-[49%]">
            <Field
              component={Fields.Input}
              name="nameUz"
              type="text"
              label={t("nameUz")}
              placeholder={t("nameUz")}
            />
            <Field
              component={Fields.Input}
              name="nameRu"
              type="text"
              label={t("nameRu")}
              placeholder={t("nameRu")}
            />
            <Field
              component={Fields.Input}
              name="nameEn"
              type="text"
              label={t("nameEn")}
              placeholder={t("nameEn")}
            />
          </div>
          <div className="w-[49%]">
            <Field
              required
              name="subject"
              url="/subjects"
              optionValue="_id"
              optionLabel="titleEn"
              label={t("subjects")}
              placeholder={t("subjects")}
              component={Fields.AsyncSelect}
              onChange={(value: any) => {
                setFieldValue("subject", value);
              }}
              rootClassName="mb-[10px] w-full mr-[10px]"
            />
            <Field
              component={Fields.Input}
              name="point"
              type="text"
              label={t("point")}
              placeholder={t("point")}
              rootClassName="mb-[15px]"
            />
            {/* <div className="col-span-2">
              <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#E6ECFE] dark:bg-[#454d70] rounded-[6px] inline-block mb-[12px] mr-[10px]">
                {t("photo")}
              </p>
              <Field
                name="photoUrl"
                label={t("Photo")}
                placeholder={t("Photo")}
                component={Fields.FileUpload3}
                accept="image/png, image/jpeg, image/jpg"
              />
            </div> */}
          </div>
        </div>
        <div className="mb-[24px]">
          <p className="mb-[10px] font-bold text-[18px]">{t("Questions")}</p>
          {get(values, "questions", []).map((item: any, index: number) => {
            return (
              <div
                key={item.uid}
                className="flex justify-between flex-col w-full border-2 border-dashed rounded-[10px] p-2 mb-[10px]"
              >
                <div className="w-full flex justify-between">
                  <div className="w-[48%] flex">
                    <div className="w-full">
                      <Field
                        rootClassName="w-full mr-[10px] mb-[15px]"
                        component={Fields.Input}
                        name={`questions[${index}].titleUz`}
                        type="text"
                        placeholder={t("question (uz)")}
                        label={t("question (uz)")}
                        size="large"
                        onChange={(e: any) => {
                          setFieldValue(
                            `questions[${index}].titleUz`,
                            e.target.value
                          );
                        }}
                      />
                      <Field
                        rootClassName="w-full mr-[10px] mb-[15px]"
                        component={Fields.Input}
                        name={`questions[${index}].titleRu`}
                        type="text"
                        placeholder={t("question (ru)")}
                        label={t("question (ru)")}
                        size="large"
                        onChange={(e: any) => {
                          setFieldValue(
                            `questions[${index}].titleRu`,
                            e.target.value
                          );
                        }}
                      />
                      <Field
                        rootClassName="w-full mr-[10px] mb-[15px]"
                        component={Fields.Input}
                        name={`questions[${index}].titleEn`}
                        type="text"
                        placeholder={t("question (en)")}
                        label={t("question (en)")}
                        size="large"
                        onChange={(e: any) => {
                          setFieldValue(
                            `questions[${index}].titleEn`,
                            e.target.value
                          );
                        }}
                      />
                      <Field
                        component={Fields.Select}
                        name={`questions[${index}].type`}
                        label="type"
                        placeholder={t("Test turini tanlang")}
                        optionLabel="label"
                        optionValue="value"
                        isClearable={true}
                        options={[
                          {
                            label: t(
                              "Oddiy ochiq test (O'quvchi variantlardan birini tanlaydi)"
                            ),
                            value: 1,
                          },
                          {
                            label: t(
                              "Oddiy yopiq test (O'quvchi savolga javob yozadi)"
                            ),
                            value: 2,
                          },
                          {
                            label: t(
                              "Ochiq va yopiq test (O'quvchi variantlardan birini tanlaydi va savolga javob yozadi)"
                            ),
                            value: 3,
                          },
                          {
                            label: t(
                              "Geometrik chizmalari bor test (O'quvchi geometrik chizmalar chizadi)"
                            ),
                            value: 4,
                          },
                          {
                            label: t("Hammasi"),
                            value: 5,
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="w-[48%]">
                    {get(item, "answers", []).map((ans: any, idx: number) => {
                      return (
                        <div key={index} className="flex mb-[30px]">
                          <div className="w-full">
                            <Field
                              rootClassName="w-full mr-[10px] mb-[15px]"
                              component={Fields.Input}
                              name={`questions[${index}].answers[${idx}].answerUz`}
                              type="text"
                              placeholder={t("answer (uz)")}
                              label={t("answer (uz)")}
                              size="large"
                              onChange={(e: any) => {
                                setFieldValue(
                                  `questions[${index}].answers[${idx}].answerUz`,
                                  e.target.value
                                );
                              }}
                            />
                            <Field
                              rootClassName="w-full mr-[10px] mb-[15px]"
                              component={Fields.Input}
                              name={`questions[${index}].answers[${idx}].answerRu`}
                              type="text"
                              placeholder={t("answer (ru)")}
                              label={t("answer (ru)")}
                              size="large"
                              onChange={(e: any) => {
                                setFieldValue(
                                  `questions[${index}].answers[${idx}].answerRu`,
                                  e.target.value
                                );
                              }}
                            />
                            <Field
                              rootClassName="w-full mr-[10px]"
                              component={Fields.Input}
                              name={`questions[${index}].answers[${idx}].answerEn`}
                              type="text"
                              placeholder={t("answer (en)")}
                              label={t("answer (en)")}
                              size="large"
                              onChange={(e: any) => {
                                setFieldValue(
                                  `questions[${index}].answers[${idx}].answerEn`,
                                  e.target.value
                                );
                              }}
                            />
                            <Checkbox
                              className="mt-[20px]"
                              checked={
                                values.questions[index].answers[idx].isCorrect
                              }
                              onChange={(e: any) => {
                                const updatedAnswers = values.questions[
                                  index
                                ].answers.map((ans: any, ansIdx: number) => ({
                                  ...ans,
                                  isCorrect:
                                    ansIdx === idx ? e.target.checked : false,
                                }));
                                setFieldValue(
                                  `questions[${index}].answers`,
                                  updatedAnswers
                                );
                              }}
                            >
                              true answer
                            </Checkbox>
                          </div>
                          <div className="h-full contents">
                            <div className="ml-[8px] flex flex-col justify-center">
                              {get(item, "answers", []).length > 1 && (
                                <button
                                  type="button"
                                  className="w-[30px] h-[100%] border-2 rounded-[5px] mb-[6px]"
                                  onClick={() =>
                                    removeAnsBox(item.uid, ans.uid)
                                  }
                                >
                                  <MinusCircleOutlined
                                    style={{ color: "red" }}
                                  />
                                </button>
                              )}
                              {get(item, "answers", []).length - 1 === idx && (
                                <button
                                  type="button"
                                  className="w-[30px] h-[100%] border-2 rounded-[5px]"
                                  onClick={() => addAnsBox(item.uid)}
                                >
                                  <PlusCircleOutlined
                                    style={{ color: "#40a9ff" }}
                                  />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="w-full">
                  <div className="mr-[8px] mt-[12px] flex justify-center w-full">
                    {get(values, "questions", []).length > 1 && (
                      <button
                        type="button"
                        className="h-[30px] w-full border-2 rounded-[5px] mr-[6px]"
                        onClick={() => removeMultiBox(item.uid)}
                      >
                        <MinusCircleOutlined style={{ color: "red" }} />
                      </button>
                    )}
                    {get(values, "questions", []).length - 1 === index && (
                      <button
                        type="button"
                        className="h-[30px] w-full border-2 rounded-[5px]"
                        onClick={() => addMultiBox()}
                      >
                        <PlusCircleOutlined style={{ color: "#40a9ff" }} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        htmlType="submit"
        size="large"
        title={t("Создать")}
        className="mt-[10px] w-full"
      />
    </>
  );
};

export default Form;
