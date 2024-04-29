import express, { NextFunction, Request, Response } from "express";
import { eventController } from "../../controllers/event/event.controller";

const eventRoute = express.Router();

const eventcontroller = new eventController();

// get all event

eventRoute.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Parse query parameters
    const page = parseInt(req.query.page as string, 10) || 1;
    const perPage = parseInt(req.query.perPage as string, 10) || 10;

    // Fetch users with pagination
    const results = await eventcontroller.GetAllEvent({ page, perPage });

    // Check if users exist
    if (results.length > 0) {
      res.status(200).json({
        status: "success",
        message: "Events list found!!!",
        data: {
          Event: results,
          pageInfo: {
            currentPage: page,
            totalPages: Math.ceil(results.length / perPage),
            totalUsers: results.length,
          },
        },
      });
    } else {
      throw new Error("No Events in System");
    }
  } catch (error: unknown | any) {
    next(error);
  }
});

// Get Event By Id

eventRoute.get("/:id",async (req:Request , res:Response , next:NextFunction)=>{
  try{
    const id = req.params.id;
    const event = await eventcontroller.GetById(id);
    res.json({
      message:"Event is Found!",
      data : event
    })
  }catch(error:unknown | any){
    next(error);
  }
})

// Create a new event

eventRoute.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventData = await eventcontroller.CreateEvent(req.body);
      res.status(201).json({
        message: "Event created successfully",
        data: eventData,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Update Event

eventRoute.put("/:id",async(req:Request , res:Response , next:NextFunction)=>{
  
})


export default eventRoute;
