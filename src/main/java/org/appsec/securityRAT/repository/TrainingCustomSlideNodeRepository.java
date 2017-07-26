package org.appsec.securityRAT.repository;

import org.appsec.securityRAT.domain.TrainingCustomSlideNode;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the TrainingCustomSlideNode entity.
 */
public interface TrainingCustomSlideNodeRepository extends JpaRepository<TrainingCustomSlideNode,Long> {

}
