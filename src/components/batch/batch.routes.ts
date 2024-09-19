import { Router } from "express";
import BatchController from "./batch.controller";
import auth from "../../utils/auth";
import { checkAdmin } from "./batch.helper";
import adminAuthorizationMiddleware from "../../utils/admin.middleware";

class BatchRoute {
	public router: Router;
	batchController = new BatchController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		//Route to get Batches
		this.router.get('/batch',adminAuthorizationMiddleware, this.batchController.getBatches);
		// Route to create a new batch
		this.router.post('/batch',adminAuthorizationMiddleware, this.batchController.createBatch);
		// Route to add a branch to a batch for a specific year
		this.router.post('/batch/branch',adminAuthorizationMiddleware, this.batchController.addBranch);
		//Route to delete a Batch
		this.router.delete(
			'/batch/:year',
			adminAuthorizationMiddleware,
			this.batchController.deleteBatch,
		);
		//Route to update a Batch
		this.router.patch('/batch',adminAuthorizationMiddleware, this.batchController.updateBatch);
		//Route to get Batch analytics
		this.router.get(
			'/batch/analytics',
			adminAuthorizationMiddleware,
			this.batchController.getVacantSeats,
		);
	}
}

export default new BatchRoute().router;