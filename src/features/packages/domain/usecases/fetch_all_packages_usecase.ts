import showToast from "../../../../core/app/toast_config";
import { PackageLocalDataSource } from "../../data/local_data_source/package_local_data_source";
import { PackageModel } from "../../data/models/package_model";

export class FetchAllPackagesUseCase {

    private localDataSource!: PackageLocalDataSource;
    constructor() {
        this.localDataSource = new PackageLocalDataSource();
    }

    async call(): Promise<Array<PackageModel>> {
        let packages: Array<PackageModel> = [];
        const response = await this.localDataSource.getPackagesList();
        if (response.data != null) {
            packages = response.data;
        } else if (response.exception != null) {
            packages = [];
            showToast({
                title: "Fetching your packages",
                message: `${response.exception?.message}`,
                type: "error",
            });
        }

        return packages;

    }
}