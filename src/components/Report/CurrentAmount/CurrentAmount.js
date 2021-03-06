import Line from "../../../assets/images/line.svg";
import { sortMounth } from "../../../helpers/support/FilterState";
import { useEffect, useState } from "react";
import {
  getTransactions,
  getCurrentPeriod,
} from "../../../redux/transaction/selectors";
import period from "../../../helpers/SvodkaMonth.js";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import s from "./CurrentAmount.module.css";

const CurrentAmount = () => {
  const date = useSelector(getCurrentPeriod);
  const transaction = useSelector(getTransactions);
  const [costs, setCosts] = useState("");
  const [incomes, setIncomes] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const cost = sortMounth(transaction, "costs", period, date.year);
    setCosts(cost.filter((tr) => Object.keys(tr).toString() === date.name));
    const income = sortMounth(transaction, "incomes", period, date.year);
    setIncomes(income.filter((tr) => Object.keys(tr).toString() === date.name));
  }, [date, transaction]);

  return (
    <div className={s.userAmount}>
      <div className={s.expensesWrap}>
        <p className={s.expenseText}>{t("costs")} :</p>
        {costs.length > 0 ? (
          costs.map((tr) => (
            <span className={s.expensesTotal} key={Object.keys(tr)}>
              -{Object.values(tr)} {t("money.uah")}.
            </span>
          ))
        ) : (
          <span className={s.expensesTotal}>0 {t("money.uah")}.</span>
        )}
      </div>
      <img className={s.Line} src={Line} alt="line" width="2" height="32" />
      <div className={s.incomeWrap}>
        <p className={s.incomeText}>{t("incomes")} :</p>
        {incomes.length > 0 ? (
          incomes.map((tr) => (
            <span className={s.incomeTotal} key={Object.keys(tr)}>
              +{Object.values(tr)} {t("money.uah")}.
            </span>
          ))
        ) : (
          <span className={s.incomeTotal}>0 {t("money.uah")}.</span>
        )}
      </div>
    </div>
  );
};
export default CurrentAmount;
