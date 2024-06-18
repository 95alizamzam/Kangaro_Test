import showToast from "../../../../core/app/toast_config";
import { PackageLocalDataSource } from "../../data/local_data_source/package_local_data_source";

export class DeletePackageUseCase {

    private localDataSource!: PackageLocalDataSource;
    constructor() {
        this.localDataSource = new PackageLocalDataSource();
    }

    async call(probs: { packageId: number }): Promise<void> {
        const title = "Delete Package";
        const response = await this.localDataSource.deletePackage({ packageId: probs.packageId });
        if (response.data != null) {
            let isSuccess = response.data === true;
            const successMessage = "Your Package Deleted Succesfully";
            const errorMessage = "Something went wrong while deleting your packages";
            showToast({
                title: title,
                message: isSuccess ? successMessage : errorMessage,
                type: isSuccess ? 'success' : 'error'
            })

        } else if (response.exception != null) {
            showToast({ title: title, message: response.exception.message, type: 'error' })
        }


    }
}