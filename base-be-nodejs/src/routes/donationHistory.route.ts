import { Router } from "express";
import { ResponseEntity } from "../entities/response.entity";
import { BaseService } from "../services/Base.service";
import { DonationHistoryClass } from "../models/DonationHistoryClass";
import { DonationHistory } from "../entities/donationHistory.entity";
import { User } from "../entities/user.entity";
import { UserClass } from "../models/UserClass";
import { DonationHistoryDTO } from "../entities/dtos/donationHistory.dto";

const router = Router();
const service = new BaseService<DonationHistory, DonationHistoryClass>(
  DonationHistoryClass
);
const userService = new BaseService<User, UserClass>(UserClass);

router.get("/:campaign_detail_id", async (req, res) => {
  try {
    const campaign_detail_id = Number(req.params.campaign_detail_id);
    const result = (await service.getAll()).filter(
      (item) => item.project_detail_id === campaign_detail_id
    );
    const donationHistories = <DonationHistoryDTO[]>result;

    await Promise.all(
      donationHistories.map(async (item) => {
        item.user = item.is_anonymous
          ? {}
          : <User>await userService.findOne("id", item.user_id ?? 0);
      })
    );

    res.status(200).json(<ResponseEntity<DonationHistoryDTO>>{
      data: result,
      status: 200,
    });
  } catch (err) {
    res.status(500).json(<ResponseEntity<null>>{
      status: 500,
      message: err,
    });
  }
});

router.post("/insert", async (req, res) => {
  try {
    const body = req.body;
    const result = await DonationHistoryClass.create(body);
    res.status(200).json(<ResponseEntity<DonationHistory>>{
      data: result.toJSON(),
      status: 200,
    });
  } catch (err) {
    res.status(500).json(<ResponseEntity<null>>{
      status: 500,
      message: err,
    });
  }
});

export default router;
